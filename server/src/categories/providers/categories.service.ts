import { Injectable } from '@nestjs/common';
import { Category } from '../category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  public async findAll() {
    return await this.categoryRepository.find({
      relations: ['todos'],
    });
  }

  public async findCategoryById(id: number) {
    return await this.categoryRepository.findOne({
      where: { id },
      relations: ['todos'],
    });
  }
  public async createCategory(title: string) {
    const newCategory = this.categoryRepository.create({ title });
    return await this.categoryRepository.save(newCategory);
  }
}
