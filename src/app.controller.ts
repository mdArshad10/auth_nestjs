import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import * as jwt from "jsonwebtoken";
import { IGetUserAuthInfoResponse } from './type/userResponse';
import { User } from './schema/user.schema';


@Controller('api/v1/users')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post('register')
  async registerUser(@Body() body: userRegister, @Res() resp: Response) {
    const userDetail = await this.appService.registerUser(body);
    resp.status(201).json({
      success: true,
      message: "user register successfully",
      user: userDetail
    })
  }


  @Post('login')
  async loginUser(@Body() body: userRegister, @Res() resp: Response) {
    const userDetail = await this.appService.loginUser(body);
    if (!userDetail) {
      return resp.status(400).json({
        message: "invalid user name or password"
      })
    }
    const token = this.generateToken(userDetail);

    resp
    .cookie('token',token,{
      sameSite:true,
      httpOnly:true,
      maxAge:Date.now() + 1000 * 60 * 60 * 24 * 15
    })
    .status(200).json({
      message:"user logging successfully",
      success:true,
      user: userDetail
    })

  }

  @Get("me")
  async getUser(@Req() req:IGetUserAuthInfoResponse,@Res() resp:Response){
    const userId = req.user.id
    const user = await this.appService.getUser(userId);
    if(!user){
      resp.status(400).json({
        message:"user is not found",
        success:false
      })
    }
    resp.status(200).json({
      success:true,
      message:"user get successfully",
      data:user
    })
  }

  generateToken(user:UserById):string{
    return jwt.sign({id:user._id},"akfkadfkadlf;kadfkadf",{
      expiresIn:'15d'
    })
  }
}

class UserById extends User{
  _id?:string
}


type userRegister = {
  username: string,
  email: string,
  password: string
}

type userLogin = {
  username?: string,
  email: string,
  password: string
}