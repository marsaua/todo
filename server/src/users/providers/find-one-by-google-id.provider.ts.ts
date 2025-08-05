import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNext } from '../user.entity';

@Injectable()
export class FindOneByGoogleIdProveder {
  constructor(
    @InjectRepository(UserNext)
    private readonly usersRepository: Repository<UserNext>,
  ) {}

  public async findOneByGoogleId(googleId: string) {
    return await this.usersRepository.findOneBy({ googleId });
  }
}
