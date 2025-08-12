import {
  Controller,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CategoriesService } from './providers/categories.service';
import { Get, Param, Post, Body, Delete } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Todo } from 'src/todos/todo.entity';
import { TodosService } from 'src/todos/providers/todos.service';
import { Inject, forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserType } from 'src/auth/enums/active-user-type';
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly todosService: TodosService,
    private readonly categoriesService: CategoriesService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  @Get()
  public async getAllCategories(@ActiveUser() user: ActiveUserType) {
    const userId = user.sub;
    return await this.categoriesService.findAll(userId);
  }
  @Get(':id')
  public async getCategoryById(@Param('id') id: number) {
    return await this.categoriesService.findCategoryById(id);
  }
  @Post()
  public async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
    @ActiveUser() user: ActiveUserType,
  ) {
    return await this.categoriesService.createCategory(
      createCategoryDto.title,
      createCategoryDto.color,
      user.sub,
    );
  }
  @Delete(':id')
  public async deleteCategory(@Param('id') id: number) {
    let todos: Todo[];
    try {
      todos = await this.todosService.findTodosByCategoryId(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    if (todos.length > 0) {
      throw new BadRequestException(
        'Category has todos. Please delete todos first.',
      );
    }
    return await this.categoriesService.deleteCategory(id);
  }
}
