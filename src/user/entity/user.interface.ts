import { ObjectId } from "mongoose";

export class IUser{
  _id?:ObjectId;
  firstName:string;
  lastName:string;
  email:string;
  passwordHash?:string;
}