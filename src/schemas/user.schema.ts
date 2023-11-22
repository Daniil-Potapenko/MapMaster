import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User{
  @Prop()
  FirstName: string;
  
  @Prop()
  LastName: string;

  @Prop()
  Email: string;

  @Prop()
  PasswordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(User)