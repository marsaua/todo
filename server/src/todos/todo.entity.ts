import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from 'src/categories/category.entity';
import { UserNext } from 'src/users/user.entity';

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

  @ManyToOne(() => Category, (category) => category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => UserNext, (user) => user.todos, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'authorId' })
  author: UserNext;

  @Column({ name: 'authorId', type: 'uuid' })
  authorId: number;
}
