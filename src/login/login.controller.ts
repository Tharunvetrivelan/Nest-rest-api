import { Controller, Get, HttpStatus, Param, Res,Request, Post, UseGuards,Logger  } from '@nestjs/common';
import { UserService } from '../user.service';
import { response } from 'express';
import { User } from 'src/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
//@ts-nocheck
@Controller('/login')
export class LoginController {
@Post()
@UseGuards(AuthGuard('local'))
   async login(@Request() req:any):Promise<any>{
    try{
    return req.user;
    }
    catch(error){
        throw error;
    }
   }
    
}
