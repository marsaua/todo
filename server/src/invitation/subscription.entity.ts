import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  RelationId,
} from 'typeorm';
import { Company } from '../companies/company.entity';
import { UserNext } from '../users/user.entity';

@Entity('subscription')
@Index(['company', 'user'], { unique: true })
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  // --- company ---
  @ManyToOne(() => Company, (c) => c.subscriptions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @RelationId((s: Subscription) => s.company)
  companyId: number;

  // --- user ---
  @ManyToOne(() => UserNext, (u) => u.subscriptions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserNext;

  @RelationId((s: Subscription) => s.user)
  userId: number;

  @Column({ type: 'timestamptz', nullable: true })
  usedAt?: Date;

  @Column({ type: 'int', nullable: true })
  usedByUserId?: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}
