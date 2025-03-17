import { Request } from "express";


export interface IGetUserAuthInfoResponse extends Request {
    user: any // or any other type
  }