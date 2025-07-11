import { Injectable } from '@nestjs/common';
import { Todo } from '../todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { Category } from 'src/categories/category.entity';
import { CategoriesService } from 'src/categories/providers/categories.service';

@Injectable()
export class TodosService {
  constructor(
    private readonly categoriesService: CategoriesService,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  public async findAll() {
    const todos = await this.todoRepository.find({
      relations: ['category'],
    });
    return todos;
  }

  public async create(createTodoDto: CreateTodoDto) {
    //find category by id
    const category = await this.categoriesService.findCategoryById(
      createTodoDto.categoryId,
    );
    if (!category) {
      throw new Error('Category not found');
    }
    const newTodo = this.todoRepository.create({
      ...createTodoDto,
      categoryId: category.id,
    });

    return await this.todoRepository.save(newTodo);
  }

  public async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new Error('Todo not found');
    }
    todo.title = updateTodoDto.title || todo.title;
    todo.content = updateTodoDto.content || todo.content;
    todo.categoryId = updateTodoDto.categoryId || todo.categoryId;
    return this.todoRepository.save(todo);
  }
  public async delete(id: number) {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new Error('Todo not found');
    }
    return this.todoRepository.remove(todo);
  }
}
