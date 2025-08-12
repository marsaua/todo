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
import { Category } from 'src/categories/category.entity';
@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(UserNext)
    private readonly userRepository: Repository<UserNext>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
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
      const defaultCategory = [
        { title: 'Work', color: '#007bff', userId: user.id },
        { title: 'Personal', color: '#28a745', userId: user.id },
      ];
      try {
        await this.categoryRepository.save(defaultCategory);
      } catch (error) {
        console.log(error);
        throw new RequestTimeoutException('Default categories not created');
      }
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException('User not created');
    }
    return user;
  }
}
