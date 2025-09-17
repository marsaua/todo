import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNext } from '../user.entity';
import { GoogleUser } from '../interfaces/google-user.interface';
@Injectable()
export class CreateGoogleUserProvider {
  constructor(
    @InjectRepository(UserNext)
    private readonly userRepository: Repository<UserNext>,
  ) {}

  public async createGoogleUser(googleUser: GoogleUser) {
    try {
      const user = this.userRepository.create({
        ...googleUser,
        role: 'USER',
      });
      return await this.userRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new ConflictException('Could not create user');
    }
  }
}
