import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { createUserDto, findUserDto, updateUserDto } from './entity/user.dto';
import { userEntity } from './entity/user.entity';



@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  private async emailExist(email:findUserDto):Promise<boolean>{
    const emailExist = await this.userModel.findOne({email}).exec()

    if(emailExist){
      return true
    }
    return false
    
  }


  async createUser({email,firstName,lastName,password}: createUserDto): Promise<User|HttpException> {

    if(this.emailExist({email})){
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


 async findUserByEmail({email}:findUserDto):Promise<User|HttpException>{
    const user = await this.userModel.findOne({email}).exec()

    if(user){
      return user
    }
    else return new HttpException('Not found', HttpStatus.NOT_FOUND)
  }

  async findUserById({id}:updateUserDto):Promise<User|HttpException>{
    const user = await this.userModel.findById(id).exec()

    if(user){
      return user
    }
    else return new HttpException('Not found', HttpStatus.NOT_FOUND)
  }

  async deleteUser({email}:findUserDto):Promise<HttpException>{
    const deletedUser = await this.userModel.findOneAndDelete({email}).exec()
    if(deletedUser){
      return new HttpException('User delete', HttpStatus.OK)
    }
    return new HttpException('Not found', HttpStatus.NOT_FOUND)

  }

  async updateUser(dto:updateUserDto):Promise<User|HttpException>{
    try{
      const {id,password, ...data} = dto;
      return await this.userModel.findOneAndUpdate({_id:id},data).exec()
    }
    catch(e){
      console.log(e)
      return new HttpException("Server Eroor", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}
