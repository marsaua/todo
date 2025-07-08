import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetTodoParamDto {
  @ApiPropertyOptional({
    description: 'Todo ID',
    example: 1234,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number;
}
