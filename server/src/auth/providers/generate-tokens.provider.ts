import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { UserNext } from '../../users/user.entity';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    public readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    public readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(
    user: UserNext,
    expiresIn: number,
    secret: string,
    payload?: T,
  ) {
    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: expiresIn,
        secret: secret,
      },
    );
    return token;
  }

  public async generateTokens(user: UserNext) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(
        user,
        this.jwtConfiguration.accessTokenTtl,
        this.jwtConfiguration.secret!,
        {
          email: user.email,
        },
      ),
      this.signToken(
        user,
        this.jwtConfiguration.refreshTokenTtl,
        this.jwtConfiguration.refreshTokenSecret!,
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
