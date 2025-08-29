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

  @Column({
    type: 'varchar',
    nullable: false,
  })
  color: string;
}
