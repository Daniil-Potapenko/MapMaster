import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { userEntity } from './entity/user.entity';
import { createUserDto } from './entity/user.dto';
import { UserModule } from './user.module';
import { IUser } from './entity/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  async createUser({email,firstName,lastName,password}: createUserDto): Promise<User> {
    const newUserEntity = new userEntity({
      email,
      firstName,
      lastName
    }).setPassword(password)

  const createdUser = await new this.userModel(userEntity).save()

  return createdUser.id

  }

  deleteUser(){

  }

  updateUser(){

  }

  async findUser(email:string):Promise<User|false>{
    const user = await this.userModel.findOne({email})
    if(user){
      return user
    }
    else return false

  }
  
}
