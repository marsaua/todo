import { UsersService } from './providers/users.service';
import { Post, Get } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserNext } from './user.entity';
import { Controller } from '@nestjs/common';
import { Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserNext> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll(): Promise<UserNext[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserNext> {
    return this.usersService.findOne(id);
  }
}
