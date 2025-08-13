import {
  Injectable,
  BadRequestException,
  RequestTimeoutException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserNext } from '../user.entity';
import { HashingProvider } from '../../auth/providers/hashing.provider';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(UserNext)
    private readonly userRepository: Repository<UserNext>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserNext> {
    let user: UserNext;
    let existUser: UserNext | null;
    try {
      existUser = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('User not created');
    }
    if (existUser) {
      throw new BadRequestException('User already exists');
    }
    try {
      const password = await this.hashingProvider.hashPassword(
        createUserDto.password,
      );
      user = this.userRepository.create({
        ...createUserDto,
        password,
      });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('User not created');
    }
    if (!user) {
      throw new BadRequestException('User not created');
    }
    try {
      user = await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('User not created');
    }
    return user;
  }
}
