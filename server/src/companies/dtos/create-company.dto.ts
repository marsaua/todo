import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    example: 'name',
    description: 'Company name',
    required: true,
  })
  companyName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @IsEmail()
  @ApiProperty({
    example: 'email@gmail.com',
    description: 'Email',
    required: true,
  })
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({
    example: 'description',
    description: 'Description',
  })
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({
    example: 'logo',
    description: 'Company logo',
  })
  companyLogo?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    example: 'password',
    description: 'Password',
    required: true,
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    example: 'password',
    description: 'Confirm password',
    required: true,
  })
  confirmPassword: string;
}
