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
import { DefaultCategoriesService } from 'src/categories/providers/default-categories.service';
import { CompaniesService } from 'src/companies/providers/companies.service';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,

    private readonly generateTokensProvider: GenerateTokensProvider,

    private readonly refreshTokensProvider: RefreshTokensProvider,

    private readonly defaultCategoriesService: DefaultCategoriesService,

    private readonly companiesService: CompaniesService,
  ) {}

  async authorizeUser(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findOneUserByEmail(email); // -> UserNext | null
    const account =
      user ?? (await this.companiesService.findOneCompanyByEmail(email)); // -> UserNext|Company|null

    if (!account) {
      throw new BadRequestException('User not found');
    }
    console.log(account);
    const isPasswordMatched = await this.hashingProvider.comparePassword(
      password,
      account.password!,
    );
    await this.defaultCategoriesService.ensureForUser(account.id);

    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.generateTokensProvider.generateTokens(
      account.id,
      account.email,
    );
    return tokens;
  }

  async registerUser(
    email: string,
    password: string,
    name?: string,
    surname?: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.createUser({
      email: email,
      password: password,
      name: name || '',
      surname: surname || '',
    });
    await this.defaultCategoriesService.ensureForUser(user.id);
    const tokens = await this.generateTokensProvider.generateTokens(
      user.id,
      user.email,
    );
    return tokens;
  }

  public async refreshTokens(refreshToken: string) {
    return this.refreshTokensProvider.refreshTokens(refreshToken);
  }
  public async logoutUser(userId: number) {
    return true;
  }
}
