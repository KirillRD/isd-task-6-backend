import { Controller, Get, Param } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('name/like/:name')
  findAllByNameLike(@Param('name') name: string): Promise<User[]> {
    return this.userService.findAllByNameLike(name);
  }
}
