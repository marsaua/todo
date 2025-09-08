import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { createHash } from 'crypto';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    public readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    public readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(
    userId: number,
    expiresIn: number,
    secret: string,
    payload?: T,
  ) {
    const token = await this.jwtService.signAsync(
      {
        sub: userId,
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

  public async generateTokens(userId: number, userEmail: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(
        userId,
        this.jwtConfiguration.accessTokenTtl,
        this.jwtConfiguration.secret!,
        {
          email: userEmail,
          role: role,
        },
      ),
      this.signToken(
        userId,
        this.jwtConfiguration.refreshTokenTtl,
        this.jwtConfiguration.refreshTokenSecret!,
        {
          role: role,
        },
      ),
    ]);
    return { accessToken, refreshToken };
  }
}
export const hashToken = (t: string) =>
  createHash('sha256').update(t).digest('hex');
