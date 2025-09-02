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
import Company from 'src/companies/company.entity';

export enum AuthorType {
  USER = 'USER',
  COMPANY = 'COMPANY',
}

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 516, nullable: false })
  content: string;

  @Column({ type: 'int', nullable: false })
  categoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ type: 'enum', enum: AuthorType })
  authorType: AuthorType;

  @Column({ type: 'int', nullable: true })
  authorUserId?: number | null;

  @Column({ type: 'int', nullable: true })
  authorCompanyId?: number | null;

  @ManyToOne(() => UserNext, (u) => u.todos, { eager: true, nullable: true })
  @JoinColumn({ name: 'authorUserId' })
  authorUser?: UserNext | null;

  @ManyToOne(() => Company, (c) => c.todos, { eager: true, nullable: true })
  @JoinColumn({ name: 'authorCompanyId' })
  authorCompany?: Company | null;
}
