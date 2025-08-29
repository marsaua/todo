import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNext } from '../user.entity';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    @InjectRepository(UserNext)
    private readonly userRepository: Repository<UserNext>,
  ) {}

  async findOneUserByEmail(email: string): Promise<UserNext | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
}
