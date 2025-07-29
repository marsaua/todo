import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { UserNext } from '../../users/user.entity';
import { HashingProvider } from '../../auth/providers/hashing.provider';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../auth/config/jwt.config';
import { ConfigService, ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly jwtService: JwtService, // не потрібно forwardRef

    private readonly configService: ConfigService, // не потрібно forwardRef
  ) {}

  async autherizeUser(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOneUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordMatched = await this.hashingProvider.comparePassword(
      password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn: this.jwtConfiguration.accessTokenTtl,
        secret: this.jwtConfiguration.secret,
      },
    );

    return { accessToken: token };
  }

  async registerUser(email: string, password: string): Promise<UserNext> {
    return this.usersService.createUser({ email, password });
  }
}
