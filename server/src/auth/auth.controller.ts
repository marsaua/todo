import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UserNext } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return await this.authService.autherizeUser(
      loginDto.email,
      loginDto.password,
    );
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterDto): Promise<UserNext> {
    return await this.authService.registerUser(
      registerDto.email,
      registerDto.password,
    );
  }
}
