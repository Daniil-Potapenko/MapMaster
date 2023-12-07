import { IsEmail,IsMongoId,IsOptional} from "class-validator";
import { ObjectId } from "mongoose";

export class findUserDto {

  @IsEmail()
  @IsOptional()
  readonly email?: string;
  @IsMongoId()
  @IsOptional()
  readonly id?: ObjectId;
  
}