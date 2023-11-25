import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './account/account.controller';
import { MongooseModule } from '@nestjs/mongoose'
import { AccountService } from './account/account.service';
import { AccountModule } from './account/account.module';
import 'dotenv/config'

@Module({
  imports: [
    AccountModule,
    MongooseModule.forRoot(process.env.MONGOOSE_URL)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
 