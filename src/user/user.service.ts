import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from 'src/user/schema/user.schema';
import { createUserDto, updateUserDto } from './entity/user.dto';
import { userEntity } from './entity/user.entity';



@Injectable()
export class UserService {
  constructor(private readonly UserRepository: UserRepository){}

  private async emailExist(email:string):Promise<boolean>{
    const emailExist = await this.UserRepository.findUser(email)

    if(emailExist){
      return true
    }
    return false
    
  }

  async createAccount({email,firstName,lastName,password}: createUserDto): Promise<User|HttpException> {

    if(this.emailExist(email)){
      return  new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }

    const newUserEntity = await new userEntity({
      email,
      firstName,
      lastName
    }).setPassword(password)

  const createdUser = await this.UserRepository.createUser(newUserEntity)
  return createdUser.id
  }


  async getPublicAccountData(email:string){

  }

  async deleteAccount(email:string):Promise<HttpException>{

    const deletedUser = await this.UserRepository.deleteUser(email)
    if(deletedUser){
      return new HttpException('User delete', HttpStatus.OK)
    }
    return new HttpException('Not found', HttpStatus.NOT_FOUND)

  }

  async updateAccount(dto:updateUserDto):Promise<User|HttpException>{
    try{
      const {password, ...data} = dto;
      return await this.UserRepository.updateUser(data)
    }
    catch(e){
      console.log(e)
      return new HttpException("Server Eroor", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

}




