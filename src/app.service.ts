import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { userLoginInput,userRegisterInput } from './dto/create-user.input';
import * as bcrypt from "bcryptjs";

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async registerUser(userInput:userRegisterInput) :Promise<User> {
    const createUser = new this.userModel(userInput);
    return await createUser.save();
  }

  async loginUser(userInput:userLoginInput):Promise<User | false>{
    const user:any = await this.userModel.findOne({email:userInput.email});
    const isComparePassword = await bcrypt.compare(userInput.password, user.password);
    if(!isComparePassword){
      return false 
    }
    return user;
  }

  async getUser(id:string):Promise<User | null>{
    const user:any = await this.userModel.findById(id);
    if(!user){
      return null;
    }
    return user;
  }
}
