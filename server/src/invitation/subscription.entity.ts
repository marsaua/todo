import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  Unique,
} from 'typeorm';

@Entity('subscription')
@Unique(['companyId', 'userId'])
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyId: number;

  @Column()
  userId: number;

  @Column()
  usedAt?: Date;

  @Column({ nullable: true })
  usedByUserId?: number;

  @CreateDateColumn()
  createdAt: Date;
}
