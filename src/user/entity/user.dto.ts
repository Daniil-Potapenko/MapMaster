import { IsEmail, IsMongoId, IsOptional, IsStrongPassword, Length } from "class-validator";
import { ObjectId } from "mongoose";

export class createUserDto{

  @IsEmail()
    email:string;

  @Length(2,30)
    firstName:string;

  @Length(2,30)
    lastName:string;

  @IsStrongPassword({
    minLength:6
  })
    password:string;

}

export class findUserDto{

  @IsEmail()
    email:string;
}

export class updateUserDto{

  @IsMongoId()
    id:ObjectId

  @IsEmail()
    email?:string;

  @Length(2,30)
    firstName?:string;

  @Length(2,30)
    lastName?:string;

  @IsStrongPassword({
    minLength:6
  })
    password?:string;

}