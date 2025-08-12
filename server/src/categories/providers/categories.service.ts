import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Category } from '../category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from 'src/todos/todo.entity';
import { ILike } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  public async findAll(userId: number) {
    let categories: Category[];
    try {
      categories = await this.categoryRepository.findBy({ userId });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    return categories;
  }

  public async findCategoryById(id: number) {
    let category: Category | null;
    try {
      category = await this.categoryRepository.findOne({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    if (!category) {
      throw new BadRequestException(
        'Category not found. Please refresh the page.',
      );
    }
    return category;
  }

  public async createCategory(title: string, color: string, userId: number) {
    let category: Category;
    const exists = await this.categoryRepository.exists({
      where: { userId, title: ILike(title) },
    });
    if (exists) {
      throw new BadRequestException(
        'Category already exists. Please try again.',
      );
    }

    const newCategory = this.categoryRepository.create({
      title,
      color,
      userId,
    });
    try {
      category = await this.categoryRepository.save(newCategory);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    return category;
  }

  public async deleteCategory(id: number) {
    let category: Category | null;
    try {
      category = await this.categoryRepository.findOne({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    if (!category) {
      throw new BadRequestException(
        'Category not found. Please refresh the page.',
      );
    }
    try {
      await this.categoryRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
    return category;
  }
}
