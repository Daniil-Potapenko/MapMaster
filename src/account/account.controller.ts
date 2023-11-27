import { Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import { AccountService } from './account.service';
import { createUserDto } from './dto/create.user.dto';
import { loginUserDto } from './dto/login.user.dto';


@Controller('account')
export class AccountController {
  constructor(private AccountService: AccountService){}

  @UsePipes(new ValidationPipe())
  @Post('user/')
  async registration(@Body() createUserDto: createUserDto){
      this.AccountService.createUser(createUserDto)
    }
  
  @Post('login/')
  async login(@Body() loginUserDto:loginUserDto){
    this.AccountService.login(loginUserDto)
  }
}