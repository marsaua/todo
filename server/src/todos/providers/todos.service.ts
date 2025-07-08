import { Injectable } from '@nestjs/common';
import { Todo } from '../todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  public async findAll() {
    return this.todoRepository.find();
  }
  public async create(createTodoDto: CreateTodoDto) {
    let newTodo = this.todoRepository.create({
      title: createTodoDto.title,
      content: createTodoDto.content,
      category: createTodoDto.category,
    });
    newTodo = await this.todoRepository.save(newTodo);
    return newTodo;
  }
}
