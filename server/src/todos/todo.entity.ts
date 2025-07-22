import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
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

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Category, (category) => category, {
    eager: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
