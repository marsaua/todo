import { IsEmail, IsInt, Min, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class InvitationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  //   @Type(() => Number)
  //   @IsInt()
  //   @IsInt({ message: 'companyId must be an integer number' })
  //   @Min(1, { message: 'companyId must not be less than 1' })
  //   companyId: number;

  @Type(() => Number)
  @IsOptional()
  ttlDays?: number;
}
