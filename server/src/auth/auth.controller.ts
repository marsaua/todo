import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { UserNext } from '../users/user.entity';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type';
import { Response } from 'express';
import { Res } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @Auth(AuthType.None)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ tokens: { accessToken: string; refreshToken: string } }> {
    const tokens = await this.authService.autherizeUser(
      loginDto.email,
      loginDto.password,
    );

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: `${process.env.NODE_ENV === 'development' ? 'lax' : 'none'}`,
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: `${process.env.NODE_ENV === 'development' ? 'lax' : 'none'}`,
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { tokens };
  }

  @Post('register')
  @HttpCode(201)
  @Auth(AuthType.None)
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ tokens: { accessToken: string; refreshToken: string } }> {
    const tokens = await this.authService.registerUser(
      registerDto.name,
      registerDto.surname,
      registerDto.email,
      registerDto.password,
    );
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: `${process.env.NODE_ENV === 'development' ? 'lax' : 'none'}`,
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: `${process.env.NODE_ENV === 'development' ? 'lax' : 'none'}`,
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { tokens };
  }

  @Post('refresh-tokens')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  public async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ tokens: { accessToken: string; refreshToken: string } }> {
    const refreshToken = req.cookies?.refreshToken;
    const tokens = await this.authService.refreshTokens(refreshToken);

    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      sameSite: `${process.env.NODE_ENV === 'development' ? 'lax' : 'none'}`,
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      sameSite: `${process.env.NODE_ENV === 'development' ? 'lax' : 'none'}`,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { tokens };
  }

  @Get('is-authorized')
  @Auth(AuthType.Bearer)
  public isAuthorized() {
    return true;
  }
}
