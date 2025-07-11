import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/category.entity';

@Module({
  imports: [
    TodosModule,
    CategoriesModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [Todo, Category],
        synchronize: true,
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: '195583',
        database: 'nestjs-test-app',
      }),
    }),
    TypeOrmModule.forFeature([Todo, Category]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
