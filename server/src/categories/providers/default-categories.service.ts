import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DefaultCategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async ensureForUser(userId: number): Promise<void> {
    await this.categoryRepo
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values([
        { title: 'Work', color: '#FEF8DD', userId },
        { title: 'Personal', color: '#E1F8DC', userId },
      ])
      .orIgnore()
      .execute();
  }
}
