import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Todo title',
    example: 'Todo title',
  })
  @IsString()
  @MaxLength(1024)
  title: string;

  @ApiProperty({
    description: 'Todo date',
    example: '2025-09-19T16:03:11.000Z',
  })
  @IsString()
  @MaxLength(516)
  date: string;

  @ApiProperty({
    description: 'Todo content',
    example: 'Todo content',
  })
  @IsString()
  @MaxLength(516)
  content: string;

  @ApiProperty({
    description: 'Todo category id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
