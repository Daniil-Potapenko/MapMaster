import { Body, Controller, Delete, Get, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, findUserDto, updateUserDto } from './entity/user.dto';



@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createNewUser(@Body(new ValidationPipe) dto: createUserDto){
    return this.userService.createAccount(dto)
  }

  @Delete()
  async deleteExistUser(@Body() dto:findUserDto){
    return this.userService.deleteAccount(dto.email)
  }


  @Patch()
  async updateUserInfo(@Body() dto:updateUserDto){
    return this.userService.updateAccount(dto)
  }

}

