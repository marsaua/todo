import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { TodosService } from './providers/todos.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { CategoriesService } from '../categories/providers/categories.service';
import { ConfigService } from '@nestjs/config';
import { GetTodosDto } from './dtos/get-todo-param.dto';
import { Paginated } from 'src/common/pagination/interfaces/pagination.interface';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserType } from 'src/auth/enums/active-user-type';

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
  public async getAllTodos(
    @Query() query: GetTodosDto,
    @ActiveUser() user: ActiveUserType,
  ): Promise<Paginated<Todo>> {
    const todos = await this.todosService.findAll(query, user);
    if (!todos) {
      throw new BadRequestException(
        'Todos not found. Please refresh the page.',
      );
    }
    return todos;
  }

  @Get('companys-todos')
  public async getCompanyTodos(
    @Query() query: GetTodosDto,
  ): Promise<Paginated<Todo>> {
    const todos = await this.todosService.getCompanyTodos(query);
    if (!todos) {
      throw new BadRequestException(
        'Todos not found. Please refresh the page.',
      );
    }
    return todos;
  }

  @Post()
  public async createTodo(
    @ActiveUser() user: ActiveUserType,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return this.todosService.createTodo(createTodoDto, user);
  }

  @Put(':id')
  public async updateTodo(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todosService.updateTodo(+id, updateTodoDto);
  }
  @Delete(':id')
  public async deleteTodo(@Param('id') id: number) {
    return this.todosService.deleteTodo(+id);
  }
}
