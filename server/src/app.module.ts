import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TodosModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [Todo],
        synchronize: true,
        host: 'localhost',
        port: 5433,
        username: 'postgres',
        password: '195583',
        database: 'nestjs-test-app',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
