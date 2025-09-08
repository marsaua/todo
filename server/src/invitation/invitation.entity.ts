// invitation/invitation.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import Company from '../companies/company.entity';

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (c) => c.invitations, { nullable: false })
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @RelationId((inv: Invitation) => inv.company)
  companyId: number;

  @Column()
  invitedByUserId: number;

  @Index()
  @Column()
  email: string;

  @Index({ unique: true })
  @Column()
  token: string;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  usedAt?: Date;

  @Column({ nullable: true })
  usedByUserId?: number;

  @CreateDateColumn()
  createdAt: Date;
}
