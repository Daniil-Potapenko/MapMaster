import { Body, Controller, Get, Post} from '@nestjs/common';
import { AccountService } from './account.service';
import { createUserDto } from './dto/create.user.dto';


@Controller('account')
export class AccountController {
  constructor(private AccountService: AccountService){

  }

  @Get()
  async getMe() {
    console.log('casd');
  }

  @Post()
  async registration(@Body() createUserDto: createUserDto){
      this.AccountService.createUser(createUserDto)
    }
  
  @Post()
  async login(){

  }
}
