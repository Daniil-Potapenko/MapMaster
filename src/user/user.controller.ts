import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, findUserDto } from './entity/user.dto';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('find')
  async findUserByEmail(@Body(new ValidationPipe) dto: findUserDto){
    return this.userService.findUser(dto)
  }

  @Post('create')
  async createNewUser(@Body(new ValidationPipe) dto: createUserDto){
    return this.userService.createUser(dto)
  }
}

