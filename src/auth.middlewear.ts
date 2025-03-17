import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { IGetUserAuthInfoResponse } from "./type/userResponse";

export class AuthMiddleware implements NestMiddleware{
    use(req: IGetUserAuthInfoResponse, res:Response , next: NextFunction) {
        const token = req.cookies.token;
        
        if(!token){
            res.status(400).json({
                message:"token is missing"
            })
        }
        const decode = jwt.verify(token,"akfkadfkadlf;kadfkadf");
        
        if(!decode){
            res.status(400).json({
                message:"token is missing"
            })
        }
        req.user = decode;
        next();
    }
}
