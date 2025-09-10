import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Todo } from 'src/todos/todo.entity';
import { Exclude } from 'class-transformer';
import { Subscription } from 'src/invitation/subscription.entity';

@Entity()
export class UserNext {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    length: 255,
  })
  name?: string;

  @Column({
    nullable: true,
    length: 255,
  })
  surname?: string;

  @Column({
    unique: true,
    nullable: false,
    length: 255,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 255,
  })
  @Exclude()
  password?: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @Exclude()
  googleId?: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Todo, (todo) => todo.authorCompany)
  todos?: Todo[];

  @OneToMany(() => Subscription, (s) => s.user)
  subscriptions?: Subscription[];

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  role: 'USER';
}
