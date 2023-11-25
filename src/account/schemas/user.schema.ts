import {InjectModel, Prop, Schema, SchemaFactory} from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema()
export class User{
  @Prop({ required: true })
  FirstName: string;
  
  @Prop()
  LastName: string;

  @Prop({ required: true })
  Email: string;

  @Prop({ required: true })
  PasswordHash: string;

}

export const UserSchema = SchemaFactory.createForClass(User)

