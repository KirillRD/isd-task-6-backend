import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { User } from '@prisma/client';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginDto: CreateUserDto): Promise<User> {
    let user = await this.userService.findOneByName(loginDto.name);
    if (!user) {
      user = await this.userService.create(loginDto);
    }
    return user;
  }
}
