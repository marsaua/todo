import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TodosService } from './providers/todos.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { CategoriesService } from '../categories/providers/categories.service';
import { ConfigService } from '@nestjs/config';
import { GetTodosDto } from './dtos/get-todo-param.dto';
import { Paginated } from 'src/common/pagination/interfaces/pagination.interface';

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
  public getAllTodos(@Query() query: GetTodosDto): Promise<Paginated<Todo>> {
    return this.todosService.findAll(query);
  }

  @Post()
  public createTodo(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.createTodo(createTodoDto);
  }

  @Put(':id')
  public updateTodo(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.updateTodo(+id, updateTodoDto);
  }
  @Delete(':id')
  public deleteTodo(@Param('id') id: number) {
    return this.todosService.deleteTodo(+id);
  }
}
