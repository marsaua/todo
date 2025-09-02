import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { ConfigType } from '@nestjs/config';

import { GenerateTokensProvider } from './generate-tokens.provider';
import { forwardRef } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { ActiveUserType } from '../interfaces/active-user-type.interface';
import { CompaniesService } from 'src/companies/providers/companies.service';
type RefreshPayload = Pick<ActiveUserType, 'sub' | 'role'>;

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokensProvider: GenerateTokensProvider,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(forwardRef(() => CompaniesService))
    private readonly companiesService: CompaniesService,
  ) {}

  public async refreshTokens(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync<RefreshPayload>(
        refreshToken,
        {
          secret: this.jwtConfiguration.refreshTokenSecret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      );
      const { sub, role } = payload;
      if (!role) throw new Error('Role not found');

      const principal =
        role === 'USER'
          ? await this.usersService.findOneById(sub)
          : await this.companiesService.findCompanyById(sub);
      if (!principal) throw new UnauthorizedException('Subject not found');

      return this.generateTokensProvider.generateTokens(
        principal.id,
        principal.email,
        role,
      );
    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('Could not refresh tokens');
    }
  }
}
