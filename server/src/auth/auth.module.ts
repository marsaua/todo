import { Module } from '@nestjs/common';
import { HashingProvider } from './providers/hashing.provider';
import { BcryptProvider } from './providers/bcrypt.provider';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AuthService } from './providers/auth.service';
import { forwardRef } from '@nestjs/common';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokensProvider } from './providers/generate-tokens.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';
import { GoogleAuthenticationService } from './social/providers/google-authentication.service';
import { GoogleAuthenticationController } from './social/google-authentication.controller';
import { DefaultCategoriesService } from 'src/categories/providers/default-categories.service';
import { CategoriesModule } from 'src/categories/categories.module';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  controllers: [AuthController, GoogleAuthenticationController],
  providers: [
    AuthService,
    JwtService,
    {
      provide: HashingProvider,
      useClass: BcryptProvider,
    },
    GenerateTokensProvider,
    RefreshTokensProvider,
    GoogleAuthenticationService,
    DefaultCategoriesService,
  ],
  exports: [
    HashingProvider,
    AuthService,
    JwtService,
    GenerateTokensProvider,
    RefreshTokensProvider,
    DefaultCategoriesService,
  ],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    forwardRef(() => CategoriesModule),
    forwardRef(() => CompaniesModule),
  ],
})
export class AuthModule {}
