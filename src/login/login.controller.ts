import { Controller, Get, HttpStatus, Param, Res,Request, Post, UseGuards,Logger, Req, Body  } from '@nestjs/common';
import { UserService } from '../user.service';
import { response } from 'express';
import { User } from 'src/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import LoginDto from './login.dto';
// import { LocalStrategy } from './local.strategy';

@Controller('/login') 
export class LoginController {
constructor(private readonly loginService:UserService){}
@Post()
   async login(@Res() response : any,@Body() loginDto: LoginDto):Promise<any>{
        //     const user = await this.loginService.findOne(username);
        //     if(!user){
        //        return response.status(HttpStatus.UNAUTHORIZED);     
        // }
        const isvalid = await this.loginService.validateUser(loginDto.name,loginDto.password);
        if(isvalid){
            console.log("Success")
            return response.status(HttpStatus.OK).json({message:"Login Successfull"})    
        }
    return response.status(HttpStatus.UNAUTHORIZED).json({
        status:"Sorry , OOPS",
    })
    
    
        
    
        
    }
}
