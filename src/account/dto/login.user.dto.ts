import { IsEmail, Length } from "class-validator";

export class loginUserDto{

  @IsEmail()
  readonly email:string;
  @Length(5,20)
  readonly password:string;

}