import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoCategory } from './enums/todoCategory.enum';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 516,
    nullable: false,
  })
  content: string;

  @Column({
    type: 'enum',
    enum: TodoCategory,
    nullable: false,
    default: TodoCategory.PERSONAL,
  })
  category: TodoCategory;
}
