import {
  Injectable,
  forwardRef,
  Inject,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
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
import { ActiveUserType } from 'src/auth/enums/active-user-type';
import { Company } from 'src/companies/company.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserNext)
    private readonly userRepository: Repository<UserNext>,
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,

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
      user = await this.userRepository.findOne({
        where: { id },
        relations: { subscriptions: true },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        { description: 'Error connecting to the database' },
      );
    }
    console.log(user);
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

  async currentUser(active: ActiveUserType) {
    console.log('find by id =', active.sub, typeof active.sub);
    let user: UserNext | Company | null = null;

    if (!active?.sub) throw new UnauthorizedException();
    if (active.role === 'USER') {
      user = await this.userRepository.findOne({
        where: { id: active.sub },
        relations: { subscriptions: { company: true } },
      });
      if (!user) throw new NotFoundException('User not found');
      console.log('ActiveUser raw:', active);
    }
    if (active.role === 'COMPANY') {
      user = await this.companyRepository.findOne({
        where: { id: active.sub },
      });
      if (!user) throw new NotFoundException('Company not found');
      console.log('ActiveCompany raw:', active);
    }
    return user;
  }
}
