import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { TodosService } from './providers/todos.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { CategoriesService } from '../categories/providers/categories.service';
import { ConfigService } from '@nestjs/config';

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
  constructor(
    private readonly todosService: TodosService,
    private readonly categoriesService: CategoriesService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  public getAllTodos() {
    console.log('getAllTodos');
    console.log(this.configService);
    return this.todosService.findAll();
  }
  @Post()
  public createTodo(@Body() createTodoDto: CreateTodoDto) {
    console.log('createTodo');
    console.log(this.categoriesService);
    return this.todosService.create(createTodoDto);
  }
  @Put(':id')
  public updateTodo(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.update(+id, updateTodoDto);
  }
  @Delete(':id')
  public deleteTodo(@Param('id') id: number) {
    return this.todosService.delete(+id);
  }
}
