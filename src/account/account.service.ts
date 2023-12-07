import { Injectable, ValidationPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { createUserDto } from './dto/create.user.dto'
import { findUserDto } from './dto/find.user.dto';
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

  async findUser(identificator:findUserDto){

    if(identificator.id){
      return await this.userModel.findById(identificator.id).exec()
    }
    if(identificator.email){
      return await this.userModel.findOne({email:identificator.email}).exec()
    }
  }

  /**
   * Check email adress in database
   * @param email
   * @returns 
   * true - if email not found in db
   * false if email exist in db
   */
  async checkEmail(email:string){
    const emailExist = this.userModel.findOne({email}).exec()
    if(emailExist){
      return false
    }
    else return true
  }

  async validateUserCredentials(email:string,password:string){
    const {_id, ...user} = await this.findUser({email})
    
    if(user!){
      return "false 1"
    }
    
    const newUserEntiy =  new userEntity(user)
    let credentialIsCorrect = await newUserEntiy.validatePassword(password)

    return credentialIsCorrect
  }

  // async validateUserCredentials(email:string,password:string){
  //   const user  = await this.findUser({email})
  //   if(user!){
  //     return false
  //   }
  //   const {_id, ...userData} = user;
  //   const newUserEntiy = new userEntity(userData)
  //   const credentialIsCorrect= await newUserEntiy.validatePassword(password)
  //   return credentialIsCorrect
  // }


  // async login(loginUserDto:loginUserDto){

  //   const user = await this.userModel.find({"email":loginUserDto.email})
  //   console.log(user + "user")
  //   return user
  //   // await bcrypt.compare(loginUserDto.password, user.passwordHash)
  //   }
  
}

