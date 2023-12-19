import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserRepository } from './user.repository';




@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
})
export class UserModule {}
