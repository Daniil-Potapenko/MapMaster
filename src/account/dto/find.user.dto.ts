import { IsEmail } from "class-validator";
import { ObjectId } from "mongoose";

export class findUserDto {

  @IsEmail()
  readonly email: string;
  readonly id: ObjectId;
}