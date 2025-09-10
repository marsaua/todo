import { Entity, OneToMany, Unique } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';
import { Todo } from 'src/todos/todo.entity';
@Entity()
@Unique(['userId', 'title'])
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Column({
    type: 'int',
    nullable: true,
  })
  userId?: number;

  @Column({
    type: 'int',
    nullable: true,
  })
  companyId?: number;

  @OneToMany(() => Todo, (todo) => todo.category)
  todos: Todo[];

  @Column({
    type: 'varchar',
    nullable: false,
  })
  color: string;
}
