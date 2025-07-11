import {
  IsOptional,
  IsString,
  MaxLength,
  IsNumber,
  IsNotEmpty,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  @ApiPropertyOptional({
    description: 'Title of the todo',
    type: String,
    required: false,
  })
  title?: string;

  @IsOptional()
  @IsString()
  @MaxLength(516)
  @ApiPropertyOptional({
    description: 'Content of the todo',
    type: String,
    required: false,
  })
  content?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiPropertyOptional({
    description: 'Category of the todo',
    type: String,
    required: false,
  })
  categoryId?: number;
}
