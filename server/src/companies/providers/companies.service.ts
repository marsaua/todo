import { Injectable, Inject } from '@nestjs/common';

import { CreateCompanyDto } from '../dtos/create-company.dto';
import { CreateCompanyProvider } from './create-company.provider';
import Company from '../company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject()
    private readonly createCompanyProvider: CreateCompanyProvider,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  public async createCompany(companyDto: CreateCompanyDto) {
    return await this.createCompanyProvider.createCompany(companyDto);
  }

  public async findOneCompanyByEmail(email: string): Promise<Company | null> {
    const user = await this.companyRepository.findOne({
      where: { email: email },
    });
    return user;
  }

  public async findCompanyById(id: number): Promise<Company | null> {
    const company = await this.companyRepository.findOne({
      where: { id: id },
    });
    return company;
  }
}
