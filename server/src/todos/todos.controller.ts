import { Controller, Get, Post, Body } from '@nestjs/common';
import { TodosService } from './providers/todos.service';
import { CreateTodoDto } from './dtos/create-todo.dto';

interface Todo {
  id: number;
  title: string;
  content: string;
  completed?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  public getAllTodos() {
    console.log('getAllTodos');
    return this.todosService.findAll();
  }
  @Post()
  public createTodo(@Body() createTodoDto: CreateTodoDto) {
    console.log('createTodo');
    return this.todosService.create(createTodoDto);
  }
}
