import { Prop } from "@nestjs/mongoose";
import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator";

export class createUserDto{

  @Prop()
  @IsEmail()
  email:string;

  @Prop()
  @Length(2,30)
  firstName:string;

  @Prop()
  @Length(2,30)
  lastName:string;

  @Prop()
  @IsStrongPassword({
    minLength:6
  })
  password:string;
}