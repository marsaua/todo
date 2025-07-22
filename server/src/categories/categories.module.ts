import { Module, forwardRef } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './providers/categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { TodosModule } from '../todos/todos.module';
import { Todo } from '../todos/todo.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Todo]),
    forwardRef(() => TodosModule),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
