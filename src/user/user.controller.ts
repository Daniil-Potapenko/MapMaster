import { Body, Controller, Delete, Get, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, findUserDto, updateUserDto } from './entity/user.dto';


@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findUserByEmail(@Query(new ValidationPipe) dto: findUserDto){
    return this.userService.findUserByEmail(dto)
  }

  @Post()
  async createNewUser(@Body(new ValidationPipe) dto: createUserDto){
    return this.userService.createUser(dto)
  }

  @Delete()
  async deleteExistUser(@Body() dto:findUserDto){
    return this.userService.deleteUser(dto)
  }


  @Patch()
  async updateUserInfo(@Body() dto:updateUserDto){
    return this.userService.updateUser(dto)
  }

}

