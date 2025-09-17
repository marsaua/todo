import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthType } from './enums/auth-type';
import { CookieOptions, Response } from 'express';
import { Res } from '@nestjs/common';
import { Request } from 'express';
import { ActiveUser } from './decorators/active-user.decorator';
import { ActiveUserType } from './enums/active-user-type';
import { EnsureDefaultCategoriesGuard } from 'src/common/guards/ensure-default-categories.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @Auth(AuthType.None)
  @UseGuards(EnsureDefaultCategoriesGuard)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ tokens: { accessToken: string; refreshToken: string } }> {
    const tokens = await this.authService.authorizeUser(
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
  @Auth(AuthType.None)
  @HttpCode(201)
  // @UseGuards(EnsureDefaultCategoriesGuard)
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ tokens: { accessToken: string; refreshToken: string } }> {
    const tokens = await this.authService.registerUser(
      registerDto.email,
      registerDto.password,
      registerDto.name,
      registerDto.surname,
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
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  public async logoutUser(
    @ActiveUser() user: ActiveUserType,
    @Res({ passthrough: true }) res: Response,
  ) {
    const isDev = process.env.NODE_ENV === 'development';
    const sameSite: CookieOptions['sameSite'] = isDev ? 'lax' : 'none';

    const currentUser = await this.authService.logoutUser(+user.sub);
    const cookieBase = {
      httpOnly: true,
      sameSite,
      secure: !isDev,
      path: '/',
      ...(process.env.COOKIES_DOMAIN
        ? { domain: process.env.COOKIES_DOMAIN }
        : {}),
    };
    res.cookie('accessToken', '', cookieBase);
    res.cookie('refreshToken', '', cookieBase);
    return currentUser;
  }
}
