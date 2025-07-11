import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './providers/todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Category } from '../categories/category.entity';
import { CategoriesModule } from '../categories/categories.module';
@Module({
  imports: [TypeOrmModule.forFeature([Todo, Category]), CategoriesModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
