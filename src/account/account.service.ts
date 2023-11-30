import { Injectable, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import { createUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginUserDto } from './dto/login.user.dto';
import { userEntity } from './user/user.entity';
import { IUser } from './user/user.interface';

@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  async createUser({firstName,lastName,email,password}: createUserDto): Promise<User> {
    
    const newUserEntity = await new userEntity({
      firstName,
      lastName,
      email
    }).setPassword(password)
    const newUser = new this.userModel(newUserEntity)
    newUser.save()
    
    return newUser.id;
  } 

  async findUser(identificator:{id?:ObjectId,email?:string}){
    let user={}
    if(identificator.id){
      user = await this.userModel.findById(identificator.id).exec()
    }
    if(identificator.email){
      user = await this.userModel.find({}).exec()
    }
      
    return user; 
  }



  async validateUserCredentials(){
    const user = this.findUser
  }




    
  // async login(loginUserDto:loginUserDto){

  //   const user = await this.userModel.find({"email":loginUserDto.email})
  //   console.log(user + "user")
  //   return user
  //   // await bcrypt.compare(loginUserDto.password, user.passwordHash)
  //   }
  
}