import {
  Injectable,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from '../../users/providers/users.service';
import { HashingProvider } from '../../auth/providers/hashing.provider';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { RefreshTokensProvider } from './refresh-tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    private readonly generateTokensProvider: GenerateTokensProvider,

    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  async autherizeUser(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOneUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordMatched = await this.hashingProvider.comparePassword(
      password,
      user.password!,
    );
    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.generateTokensProvider.generateTokens(user);
    return tokens;
  }

  async registerUser(
    email: string,
    password: string,
    name?: string,
    surname?: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.createUser({
      email,
      password,
      name: name || '',
      surname: surname || '',
    });

    const tokens = await this.generateTokensProvider.generateTokens(user);
    return tokens;
  }

  public async refreshTokens(refreshToken: string) {
    return this.refreshTokensProvider.refreshTokens(refreshToken);
  }
  public async logoutUser(userId: number) {
    console.log(userId);
    return true;
  }
}
