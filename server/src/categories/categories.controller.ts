import { Controller } from '@nestjs/common';
import { CategoriesService } from './providers/categories.service';
import { Get, Param, Post, Body } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';

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
    return await this.categoriesService.createCategory(createCategoryDto.title);
  }
}
