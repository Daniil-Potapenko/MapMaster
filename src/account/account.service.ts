import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { createUserDto } from './dto/create.user.dto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@Injectable()
export class AccountService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  async createUser(createUserDto: createUserDto): Promise<User> {

    const passwordHash = bcrypt.hash(createUserDto.password, Number(process.env.BCRYPT_SALT_ROUNDS));
    console.log(createUserDto)
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }


  getAccessToken(){

  }
  getRefreshToken(){
    
  }
}
