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
import { HashingProvider } from '../auth/providers/hashing.provider';
import { BcryptProvider } from '../auth/providers/bcrypt.provider';
import { forwardRef } from '@nestjs/common';
import jwtConfig from '../auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { FindOneByGoogleIdProveder } from './providers/find-one-by-google-id.provider.ts';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserProvider,
    FindOneUserByEmailProvider,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    FindOneByGoogleIdProveder,
    CreateGoogleUserProvider,
  ],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([UserNext]),
    ConfigModule.forFeature(profileConfig),
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class UsersModule {}
