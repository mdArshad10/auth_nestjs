
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {  HydratedDocument, now } from 'mongoose';
import * as bcrypt from "bcryptjs";

export type UserDocument = HydratedDocument<User>;

@Schema({timestamps:true})
export class User {
  @Prop({required:true})
  username: string;

  @Prop({required:true})
  password: string;

  @Prop({required:true})
  email:string;

  @Prop({default:false, required:true})
  isVerify:boolean;

  @Prop()
  verifyToke:string;
  
  @Prop()
  restToken:string;

  @Prop()
  restTokenExpire: Date

  @Prop({default:now()})
  createdAt:Date

  @Prop({default:now()})
  updatedAt:Date

}

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save",async function(next){
  if(!this.isModified("password")) next();
  this.password  = await bcrypt.hash(this.password, 10);
  next();
})

export {UserSchema}

