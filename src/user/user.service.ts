import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { createUserDto, findUserDto } from './entity/user.dto';
import { userEntity } from './entity/user.entity';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}


  async createUser({email,firstName,lastName,password}: createUserDto): Promise<User|false> {
    const userExist = await this.findUser({email})
    if(userExist){
      return false
    }

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

  async findUser({email}:findUserDto):Promise<User|false>{
    const user = await this.userModel.findOne({email})
    
    if(user){
      return user
    }
    else return false

  }
  
}
