import { Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { AccountService } from './account.service';
import { createUserDto } from './dto/create.user.dto';
import { findUserDto } from './dto/find.user.dto';


@Controller('account')
export class AccountController {
  constructor(private AccountService: AccountService){}

  @UsePipes(new ValidationPipe())
  @Get('user')
  async getUser(@Body() dto:findUserDto){
      return this.AccountService.findUser(dto)
    }
  
  @UsePipes(new ValidationPipe())
  @Post('user')
  async registration(@Body() dto: createUserDto){
      return this.AccountService.createUser(dto)
    }
  
  @Post('check')
  async  validate(@Body() dto:{email:string,password:string}) {
    return this.AccountService.validateUserCredentials(dto.email,dto.password)
  }


  // @Post('login/')
  // async login(@Body() loginUserDto:loginUserDto){
  //   return this.AccountService.login(loginUserDto)
  // }
  
}