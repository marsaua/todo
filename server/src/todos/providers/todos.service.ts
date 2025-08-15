import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Todo } from '../todo.entity';
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

@Injectable()
export class TodosService {
  constructor(
    private readonly categoriesService: CategoriesService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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
  ): Promise<Paginated<Todo>> {
    let todos: Paginated<Todo>;
    console.log(postQuery);
    try {
      const where: FindOptionsWhere<Todo> = { authorId: user.sub };

      if (postQuery.categoryId) {
        where.categoryId = postQuery.categoryId;
      }
      todos = await this.paginationProvider.paginateQuery(
        postQuery,
        this.todoRepository,
        {
          where,
          relations: ['category', 'author'],
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

  public async createTodo(createTodoDto: CreateTodoDto, user: ActiveUserType) {
    const author: UserNext | null = await this.userService.findOneById(
      user.sub,
    );
    if (!author) {
      throw new BadRequestException('User not found');
    }
    //find category by id
    let category: Category | null;
    try {
      category = await this.categoriesService.findCategoryById(
        createTodoDto.categoryId,
      );
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    if (!category) {
      throw new BadRequestException('Category not found');
    }
    const newTodo = this.todoRepository.create({
      ...createTodoDto,
      categoryId: category.id,
      authorId: author.id,
    });
    try {
      await this.todoRepository.save(newTodo);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
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
