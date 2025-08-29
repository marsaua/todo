import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export default class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    length: 255,
  })
  companyName: string;

  @Column({
    nullable: false,
    length: 255,
  })
  email: string;

  @Column({
    nullable: false,
    length: 255,
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    nullable: true,
    length: 255,
  })
  description?: string;

  @Column({
    nullable: true,
    length: 255,
  })
  companyLogo?: string;
}
