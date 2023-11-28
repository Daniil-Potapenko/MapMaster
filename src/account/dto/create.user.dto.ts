import { IsEmail, Length } from "class-validator";


export class createUserDto {
  @IsEmail()
  readonly email: string;
  @Length(5,20)
  readonly password: string;
  @Length(1,20)
  readonly firstName: string;
  @Length(1,20)
  readonly lastName: string;
}