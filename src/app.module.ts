import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './account/account.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { AccountService } from './account/account.service';
import 'dotenv/config'

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGOOSE_URL)],
  controllers: [AppController, AccountController],
  providers: [AppService, AccountService],
})
export class AppModule {}
