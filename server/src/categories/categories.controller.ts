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

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly todosService: TodosService,
    private readonly categoriesService: CategoriesService,
  ) {}
  @Get()
  public async getAllCategories() {
    return await this.categoriesService.findAll();
  }
  @Get(':id')
  public async getCategoryById(@Param('id') id: number) {
    return await this.categoriesService.findCategoryById(id);
  }
  @Post()
  public async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.createCategory(
      createCategoryDto.title,
      createCategoryDto.color,
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
