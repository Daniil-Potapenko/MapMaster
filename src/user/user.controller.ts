import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { findUserDto } from './entity/user.dto';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('find')
  async findUserByEmail(@Body(new ValidationPipe) dto: findUserDto){
    return this.userService.findUser(dto)
  }
}

