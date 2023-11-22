import { Controller } from '@nestjs/common';

@Controller('account')
export class AccountController {
  getUser() {
    console.log('casd');
  }
}
