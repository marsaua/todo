import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

import { GenerateTokensProvider } from './generate-tokens.provider';
import { forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserType } from '../interfaces/active-user-type.interface';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokensProvider: GenerateTokensProvider,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<
        Pick<ActiveUserType, 'sub'>
      >(refreshToken, {
        secret: this.jwtConfiguration.refreshTokenSecret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.usersService.findOneById(Number(payload.sub));
      if (!user) throw new Error('User not found');

      return await this.generateTokensProvider.generateTokens(
        user.id,
        user.email,
      );
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Could not refresh tokens');
    }
  }
}
