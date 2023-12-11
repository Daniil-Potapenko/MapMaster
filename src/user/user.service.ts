import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { createUserDto, findUserDto } from './entity/user.dto';
import { userEntity } from './entity/user.entity';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}


  async createUser({email,firstName,lastName,password}: createUserDto): Promise<User|HttpException> {
    const userExist = await this.findUser({email})
    if(userExist){
      return  new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }

    const newUserEntity = await new userEntity({
      email,
      firstName,
      lastName
    }).setPassword(password)

  const createdUser = await new this.userModel(newUserEntity).save()
  return createdUser.id
  }

 async findUser({email}:findUserDto):Promise<User|HttpException>{
    const user = await this.userModel.findOne({email})
    
    if(user){
      return user
    }
    else return new HttpException('Not found', HttpStatus.NOT_FOUND)

  }

  deleteUser(){

  }

  updateUser(){

  }

 
  
}
