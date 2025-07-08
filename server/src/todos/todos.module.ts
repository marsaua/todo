import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './providers/todos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [TypeOrmModule.forFeature([Todo])],
})
export class TodosModule {}
