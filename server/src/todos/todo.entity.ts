import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { Category } from 'src/categories/category.entity';

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
    type: 'int',
    nullable: false,
  })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.todos, {
    eager: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
