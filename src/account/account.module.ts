import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  providers: [AccountService],
  controllers: [AccountController],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  exports: [AccountService]
})

export class AccountModule {}
