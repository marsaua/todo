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
import jwtConfig from './auth/config/jwt.config';
import environmentValidation from './config/environment.validation';
import { join } from 'path';
import { PaginationProvider } from './common/pagination/providers/pagination.provider';
import { PaginationModule } from './common/pagination/pagination.module';
import { UsersModule } from './users/users.module';
import { UserNext } from './users/user.entity';
import { AuthService } from './auth/providers/auth.service';
import { AuthModule } from './auth/auth.module';

const ENV = process.env.NODE_ENV;
@Module({
  imports: [
    TodosModule,
    CategoriesModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: join(process.cwd(), `.env.${ENV}`),
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [Todo, Category, UserNext],
        synchronize: true,
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
      }),
    }),
    TypeOrmModule.forFeature([Todo, Category, UserNext]),
    PaginationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, PaginationProvider, AuthService],
})
export class AppModule {}
