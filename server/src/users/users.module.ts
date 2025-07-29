import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNext } from './user.entity';
import { UsersService } from './providers/users.service';
import { UsersController } from './users.controller';
import profileConfig from './config/profile.config';
import { ConfigModule } from '@nestjs/config';
import { CreateUserProvider } from './providers/create-user.provider';
import { AuthModule } from '../auth/auth.module';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserNext]),
    ConfigModule.forFeature(profileConfig),
    AuthModule,
  ],
  providers: [UsersService, CreateUserProvider, FindOneUserByEmailProvider],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
