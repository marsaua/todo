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
import Company from 'src/companies/company.entity';
import { UserNext } from 'src/users/user.entity';

type Role = 'USER' | 'COMPANY';

function isCompany(a: UserNext | Company): a is Company {
  return (a as Company).companyName !== undefined;
}
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
    const role: Role = isCompany(account) ? 'COMPANY' : 'USER';

    const isPasswordMatched = await this.hashingProvider.comparePassword(
      password,
      account.password!,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid credentials');
    }

    const tokens = await this.generateTokensProvider.generateTokens(
      account.id,
      account.email,
      role,
    );
    if (role === 'USER') {
      await this.defaultCategoriesService.ensureForUser(account.id);
    }
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
    const tokens = await this.generateTokensProvider.generateTokens(
      user.id,
      user.email,
      'USER',
    );
    await this.defaultCategoriesService.ensureForUser(user.id);
    return tokens;
  }

  public async refreshTokens(refreshToken: string) {
    return this.refreshTokensProvider.refreshTokens(refreshToken);
  }
  public async logoutUser(userId: number) {
    return true;
  }
}
