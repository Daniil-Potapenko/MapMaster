import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "./schema/user.schema";
import { Model } from "mongoose";
import { userEntity } from "./entity/user.entity";


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  

  async createUser(user: userEntity){
    const newUser = new this.userModel({user})
    return newUser.save()
  }

  async findUser(email: string){
    const user = this.userModel.findOne({email}).exec()
    return user
  }

  async updateUser({_id, ...data}: userEntity){
    return this.userModel.findByIdAndUpdate({_id},data).exec()
  }

  async findUserById(_id:string){
    return this.userModel.findById(_id).exec()
  }

  async deleteUser(email:string){
    this.userModel.findOneAndDelete({email}).exec()
  }
}