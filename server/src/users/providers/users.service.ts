import {
  Injectable,
  forwardRef,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNext } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { RequestTimeoutException } from '@nestjs/common';
import { FindOneByGoogleIdProveder } from './find-one-by-google-id.provider.ts';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserNext)
    private readonly userRepository: Repository<UserNext>,

    private readonly createUserProvider: CreateUserProvider,
    @Inject(forwardRef(() => FindOneUserByEmailProvider))
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
    @Inject()
    private readonly findOneByGoogleIdProveder: FindOneByGoogleIdProveder,
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
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
  public async findOneById(id: number) {
    let user: UserNext | null = null;
    try {
      user = await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        { description: 'Error connecting to the database' },
      );
    }
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProveder.findOneByGoogleId(googleId);
  }
  public async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
