import { Controller, Get, HttpStatus, Param, Res,Request, Post, UseGuards,Logger, Req, Body  } from '@nestjs/common';
import { UserService } from '../user.service';
import { response } from 'express';
import { User } from 'src/schema/user.schema';
import { AuthGuard } from '@nestjs/passport';
import LoginDto from './login.dto';
import { JwtService } from '@nestjs/jwt';
// import { LocalStrategy } from './local.strategy';

@Controller('/login') 
export class LoginController {
constructor(private readonly loginService:UserService,
    private readonly jwtService : JwtService
){}
@Post()
   async login(@Res() response : any,@Body() loginDto: LoginDto):Promise<any>{
        const user = await this.loginService.validateUser(loginDto.name,loginDto.password); 
        
        if(user){
            const payload = { username: user.name, sub: user._id };
            const token = this.jwtService.sign(payload, { secret: 'secretKey', expiresIn: '1h' });
            return response.status(HttpStatus.OK).json({
                message: "Login Successful",
                token,
            });
        }
    return response.status(HttpStatus.UNAUTHORIZED).json({
        status:"Sorry , OOPS",
    })     
    }
}
