import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { AuthorType, Todo } from '../todo.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { Category } from 'src/categories/category.entity';
import { CategoriesService } from 'src/categories/providers/categories.service';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { GetTodosDto } from '../dtos/get-todo-param.dto';
import { Paginated } from 'src/common/pagination/interfaces/pagination.interface';
import { UserNext } from 'src/users/user.entity';
import { UsersService } from 'src/users/providers/users.service';
import { Inject } from '@nestjs/common';
import { forwardRef } from '@nestjs/common';
import { ActiveUserType } from 'src/auth/enums/active-user-type';
import { Company } from 'src/companies/company.entity';

@Injectable()
export class TodosService {
  constructor(
    private readonly categoriesService: CategoriesService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
    //Inject pagination provider
    private readonly paginationProvider: PaginationProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  public async findAll(
    postQuery: GetTodosDto,
    user: ActiveUserType,
  ): Promise<Paginated<Todo> | null> {
    let todos: Paginated<Todo> | null = null;
    console.log(postQuery);
    if (user.role === 'USER') {
      try {
        const where: FindOptionsWhere<Todo> = { authorUserId: user.sub };

        if (postQuery.categoryId) {
          where.categoryId = postQuery.categoryId;
        }
        todos = await this.paginationProvider.paginateQuery(
          postQuery,
          this.todoRepository,
          {
            where,
            relations: ['category', 'authorUser', 'authorCompany'],
            order: { createdAt: 'DESC' },
          },
        );
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          'Something went wrong. Please try again later.',
        );
      }
    } else if (user.role === 'COMPANY') {
      try {
        const where: FindOptionsWhere<Todo> = { authorCompanyId: user.sub };

        if (postQuery.categoryId) {
          where.categoryId = postQuery.categoryId;
        }
        todos = await this.paginationProvider.paginateQuery(
          postQuery,
          this.todoRepository,
          {
            where,
            relations: ['category', 'authorUser', 'authorCompany'],
            order: { createdAt: 'DESC' },
          },
        );
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException(
          'Something went wrong. Please try again later.',
        );
      }
    }
    return todos;
  }

  public async getCompanyTodos(postQuery: GetTodosDto) {
    let todos: Paginated<Todo> | null = null;
    try {
      if (!postQuery.companyId) {
        throw new BadRequestException('Company ID is required');
      }
      const where: FindOptionsWhere<Todo> = {
        authorCompanyId: postQuery.companyId,
      };

      if (postQuery.categoryId) {
        where.categoryId = postQuery.categoryId;
      }
      todos = await this.paginationProvider.paginateQuery(
        postQuery,
        this.todoRepository,
        {
          where,
          relations: ['category', 'authorUser', 'authorCompany'],
          order: { createdAt: 'DESC' },
        },
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    return todos;
  }

  public async createTodo(
    createTodoDto: CreateTodoDto,
    active: ActiveUserType,
  ) {
    // 1) категорія
    const category = await this.categoriesService.findCategoryById(
      createTodoDto.categoryId,
    );
    if (!category) throw new BadRequestException('Category not found');

    let payload: Partial<Todo> = {
      title: createTodoDto.title,
      content: createTodoDto.content,
      categoryId: category.id,
    };

    if (active.role === 'USER') {
      // автор — користувач
      payload = {
        ...payload,
        authorType: AuthorType.USER,
        authorUserId: active.sub,
        authorCompanyId: null,
      };
    } else if (active.role === 'COMPANY') {
      const company = await this.companyRepository.findOneBy({
        id: active.sub,
      });
      if (!company) throw new BadRequestException('Company not found');

      payload = {
        ...payload,
        authorType: AuthorType.COMPANY,
        authorCompanyId: active.sub,
        authorUserId: null,
      };
    } else {
      throw new BadRequestException('Unknown author role');
    }

    const newTodo = this.todoRepository.create(payload);
    await this.todoRepository.save(newTodo);
    return newTodo;
  }

  public async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    let todo: Todo | null;
    try {
      todo = await this.todoRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    if (!todo) {
      throw new BadRequestException('Todo not found. Please refresh the page.');
    }
    todo.title = updateTodoDto.title || todo.title;
    todo.content = updateTodoDto.content || todo.content;
    todo.categoryId = updateTodoDto.categoryId || todo.categoryId;
    if (updateTodoDto.categoryId) {
      const category = await this.categoriesService.findCategoryById(
        updateTodoDto.categoryId,
      );
      if (!category) {
        throw new BadRequestException('Category not found');
      }
      todo.category = category;
    }
    try {
      await this.todoRepository.save(todo);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    return todo;
  }

  public async deleteTodo(id: number) {
    let todo: Todo | null;
    try {
      todo = await this.todoRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    if (!todo) {
      throw new BadRequestException('Todo not found. Please refresh the page.');
    }
    try {
      await this.todoRepository.remove(todo);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    return todo;
  }

  // find todos by category id
  public async findTodosByCategoryId(categoryId: number) {
    let todos: Todo[];
    try {
      todos = await this.todoRepository.find({
        where: { categoryId },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    return todos;
  }
}
