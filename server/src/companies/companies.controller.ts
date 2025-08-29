import { Controller, Post, Body } from '@nestjs/common';

import { CreateCompanyDto } from './dtos/create-company.dto';
import { CompaniesService } from './providers/companies.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type';
import { Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}
  @Post()
  @Auth(AuthType.None)
  async createCompany(
    @Body() createCompanyDto: CreateCompanyDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ tokens: { accessToken: string; refreshToken: string } }> {
    const tokens = await this.companiesService.createCompany(createCompanyDto);
    res.cookie('accessToken', tokens.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: `${process.env.NODE_ENV === 'development' ? 'lax' : 'none'}`,
      path: '/',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: `${process.env.NODE_ENV === 'development' ? 'lax' : 'none'}`,
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { tokens };
  }
}
