import { BadRequestException, Injectable, Ip, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { createUserDto } from './dto/create.user.dto';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { loginUserDto } from './dto/login.user.dto';

@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  async createUser(createUserDto: createUserDto): Promise<User> {
    
    const passwordHash = await bcrypt.hash(createUserDto.password, Number(process.env.BCRYPT_SALT_ROUNDS));
    let createdUser = new this.userModel({
      email:createUserDto.email,
      lastName:createUserDto.lastName,
      firstName:createUserDto.firstName,
      passwordHash:passwordHash,
    });

    return createdUser.save();
  } 


  async login(loginUserDto:loginUserDto){

    const user = await this.userModel.find({"email":loginUserDto.email})
    console.log(user + "user")
    return "user"
    // await bcrypt.compare(loginUserDto.password, user.passwordHash)
    }
  

  async checkAuth(){

  }

  getAccessToken(){

  }
  getRefreshToken(){
    
  }
}
