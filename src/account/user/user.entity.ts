import { ObjectId } from "mongoose";
import { IUser } from "./user.interface";
import { compare, hash } from "bcrypt";

export class userEntity implements IUser {
  _id?:ObjectId;
  firstName:string;
  lastName:string;
  email:string;
  passwordHash:string;

  constructor(user: IUser){
    this.email=user.email;
    this.firstName=user.firstName;
    this.lastName=user.lastName;
  }

  public async setPassword(password:string){
    this.passwordHash = await hash(password, Number(process.env.BCRYPT_SALT_ROUNDS))
    return this
  }

  public validatePassword(password:string){
    return compare(password, this.passwordHash)
  }

  public getPublicProfile() {
    return {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName
    }
  }

  public updateLastName(lastName: string){
    this.lastName=lastName
    return this
  }

  public updateFirsName(firstName: string){
    this.firstName=firstName
    return this
  }
}