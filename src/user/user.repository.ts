import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model, ObjectId } from "mongoose";
import { userEntity } from "./entity/user.entity";
import { updateUserDto } from "./entity/user.dto";


@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  async createUser(user: userEntity){
    const newUser = new this.userModel({user})
    return newUser.save()
  }

  async updateUser({_id, ...data}:updateUserDto){
    return this.userModel.findByIdAndUpdate({_id},data).exec()
  }

  async findUser(email: string){
    const user = this.userModel.findOne({email}).exec()
    return user
  }

  async findUserById(_id:ObjectId){
    return this.userModel.findById(_id).exec()
  }

  async deleteUser(email:string){
    return this.userModel.findOneAndDelete({email}).exec()
  }
  
}