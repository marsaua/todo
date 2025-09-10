import { Module, forwardRef } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './providers/todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Category } from '../categories/category.entity';
import { CategoriesModule } from '../categories/categories.module';
import { PaginationModule } from '../common/pagination/pagination.module';
import { UsersModule } from '../users/users.module';
import { Company } from 'src/companies/company.entity';
@Module({
  imports: [
    PaginationModule,
    TypeOrmModule.forFeature([Todo, Category, Company]),
    forwardRef(() => CategoriesModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodosModule {}
