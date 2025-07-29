import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty({
    example: 'password',
    description: 'Password',
    required: true,
  })
  password: string;
}
