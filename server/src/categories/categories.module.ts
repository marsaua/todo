import { Module, forwardRef } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './providers/categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { TodosModule } from '../todos/todos.module';
import { Todo } from '../todos/todo.entity';
import { UsersModule } from 'src/users/users.module';
import { DefaultCategoriesService } from './providers/default-categories.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Todo]),
    forwardRef(() => TodosModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService, DefaultCategoriesService],
  exports: [
    CategoriesService,
    TypeOrmModule.forFeature([Category]),
    DefaultCategoriesService,
  ],
})
export class CategoriesModule {}
