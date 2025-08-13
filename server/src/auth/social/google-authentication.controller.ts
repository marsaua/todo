import { GoogleAuthenticationService } from './providers/google-authentication.service';
import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type';
import { Response } from 'express';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
  constructor(
    /**
     * Inject googleAuthenticationService
     */
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async authenticate(
    @Body() googleTokenDto: GoogleTokenDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const isProd = process.env.NODE_ENV === 'production';
    const tokens =
      await this.googleAuthenticationService.authenticate(googleTokenDto);
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: isProd ? true : false,
      sameSite: `${process.env.NODE_ENV === 'development' ? 'lax' : 'none'}`,
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: `${process.env.NODE_ENV === 'development' ? 'lax' : 'none'}`,
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return tokens;
  }
}
