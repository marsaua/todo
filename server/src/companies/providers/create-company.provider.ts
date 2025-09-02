import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Company from '../company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from '../dtos/create-company.dto';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
@Injectable()
export class CreateCompanyProvider {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

    private readonly hashingProvider: HashingProvider,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  public async createCompany(companyDto: CreateCompanyDto) {
    if (companyDto.password !== companyDto.confirmPassword) {
      throw new BadRequestException('Passwords do not match.');
    }
    const hashedPassword = await this.hashingProvider.hashPassword(
      companyDto.password,
    );
    const existsCompany = await this.companyRepository.findOne({
      where: { email: companyDto.email },
    });
    if (existsCompany) {
      throw new BadRequestException('Company already exists.');
    }
    try {
      const newCompany = this.companyRepository.create({
        companyName: companyDto.companyName,
        email: companyDto.email,
        password: hashedPassword,
        description: companyDto.description,
        companyLogo: companyDto.companyLogo,
      });

      await this.companyRepository.save(newCompany);
      const tokens = await this.generateTokensProvider.generateTokens(
        newCompany.id,
        newCompany.email,
        'COMPANY',
      );
      return tokens;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'Something went wrong. Please try again later.',
      );
    }
  }
}
