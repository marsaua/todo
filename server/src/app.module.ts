import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { Todo } from './todos/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/category.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { databaseConfig } from './config/database.config';
import appConfig from './config/app.config';
import environmentValidation from './config/environment.validation';
import { join } from 'path';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    TodosModule,
    CategoriesModule,
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), `.env.${ENV}`),
      isGlobal: true,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [Todo, Category],
        synchronize: true,
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
      }),
    }),
    TypeOrmModule.forFeature([Todo, Category]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
