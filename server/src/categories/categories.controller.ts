import {
  Controller,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CategoriesService } from './providers/categories.service';
import { Get, Param, Post, Body, Delete } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { QueryFailedError } from 'typeorm';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
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
    try {
      return await this.categoriesService.deleteCategory(id);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new BadRequestException(
          "You can't delete this category because it has tasks. Please delete or update tasks first.",
        );
      }
      throw new InternalServerErrorException();
    }
  }
}
