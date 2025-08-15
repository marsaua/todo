import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsPositive, IsInt, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class PaginationQueryDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  page?: number;

  // @IsOptional()
  // @Type(() => Number)
  // @Transform(
  //   ({ value }) => {
  //     const n = Number(value);
  //     return n === 0 ? undefined : n;
  //   },
  //   { toClassOnly: true },
  // )
  // @IsInt()
  // @Min(0)
  // categoryId?: number;
}
