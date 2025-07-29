import { IsDate, IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';

class GetTodosParamDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetTodosDto extends IntersectionType(
  GetTodosParamDto,
  PaginationQueryDto,
) {
  constructor(startDate?: Date, endDate?: Date, limit?: number, page?: number) {
    super(startDate, endDate, limit, page);
  }
}
