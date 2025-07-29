import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
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
    let user: UserNext | null;
    try {
      user = await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Something went wrong. Please try again later.',
      );
    }
    if (!user) {
      throw new BadRequestException('Such user does not exist');
    }
    return user;
  }
}
