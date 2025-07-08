import { IsEnum, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TodoCategory } from '../enums/todoCategory.enum';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Todo title',
    example: 'Todo title',
  })
  @IsString()
  @MaxLength(1024)
  title: string;

  @ApiProperty({
    description: 'Todo content',
    example: 'Todo content',
  })
  @IsString()
  @MaxLength(516)
  content: string;

  @ApiProperty({
    description: 'Todo category',
    example: 'personal',
  })
  @IsEnum(TodoCategory)
  @MaxLength(516)
  category: TodoCategory;
}
