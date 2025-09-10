import { UsersService } from './providers/users.service';
import { Post, Get, ClassSerializerInterceptor } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserNext } from './user.entity';
import { Controller } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type';
import { UseInterceptors } from '@nestjs/common';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserType } from 'src/auth/enums/active-user-type';
import { Company } from 'src/companies/company.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserNext> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll(): Promise<UserNext[]> {
    return this.usersService.findAll();
  }

  @Get('currentUser')
  findCurrentUser(
    @ActiveUser() user: ActiveUserType,
  ): Promise<UserNext | Company | null> {
    console.log('Active user in controller:', user);
    return this.usersService.currentUser(user);
  }
  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserNext> {
    return this.usersService.findOne(id);
  }
}
