// src/todos/dtos/get-todos.dto.ts
import { IsOptional, IsInt, Min, IsDate } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetTodosParamDto {
  @IsOptional()
  @Type(() => Date)
  @Transform(
    ({ value }) => {
      if (value == null) return undefined;
      const d = new Date(value);
      return isNaN(d.getTime()) ? undefined : d;
    },
    { toClassOnly: true },
  )
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @Transform(
    ({ value }) => {
      const d = new Date(value);
      return isNaN(d.getTime()) ? undefined : d;
    },
    { toClassOnly: true },
  )
  @IsDate()
  endDate: Date;

  @IsOptional()
  @Type(() => Number)
  @Transform(
    ({ value }) => {
      const n = Number(value);
      // 0 або нечисло = "без фільтра"
      return Number.isFinite(n) && n > 0 ? n : undefined;
    },
    { toClassOnly: true },
  )
  @IsInt()
  @Min(1)
  categoryId?: number;
}

export class GetTodosDto extends IntersectionType(
  GetTodosParamDto,
  PaginationQueryDto,
) {}
