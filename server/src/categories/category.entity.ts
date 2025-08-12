import { Entity, Unique } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';
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
    default: '#cccccc',
  })
  @Column({
    type: 'int',
    nullable: false,
  })
  userId: number;
  color: string;
}
