import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './providers/companies.service';
import { CreateCompanyProvider } from './providers/create-company.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { Company } from './company.entity';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, CreateCompanyProvider],
  exports: [CompaniesService],
  imports: [TypeOrmModule.forFeature([Company]), forwardRef(() => AuthModule)],
})
export class CompaniesModule {}
