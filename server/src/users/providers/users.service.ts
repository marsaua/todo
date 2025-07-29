import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNext } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserNext)
    private readonly userRepository: Repository<UserNext>,

    private readonly createUserProvider: CreateUserProvider,
    @Inject(forwardRef(() => FindOneUserByEmailProvider))
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserNext> {
    const user = await this.createUserProvider.createUser(createUserDto);
    return user;
  }
  async findAll(): Promise<UserNext[]> {
    return this.userRepository.find();
  }
  async findOne(id: number): Promise<UserNext> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  async findOneUserByEmail(email: string): Promise<UserNext | null> {
    const user =
      await this.findOneUserByEmailProvider.findOneUserByEmail(email);
    return user;
  }
}
