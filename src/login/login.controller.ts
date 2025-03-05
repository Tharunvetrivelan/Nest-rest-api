import { Controller, Get, HttpStatus, Param, Res,Request, Post, UseGuards,Logger, Req, Body, Put  } from '@nestjs/common';
import { UserService } from '../user.service';
import LoginDto from './login.dto';
import { JwtService } from '@nestjs/jwt';



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

    @Post('/forgot') 
  async forgotPassword(@Res() response: any, @Body() body: { email: string }): Promise<any> {
    try {
      const user = await this.loginService.findUserByEmail(body.email); 
      if (user) {
        return response.status(HttpStatus.OK).json({
          message: "Email found",
          email: body.email, 
        });
      }
      return response.status(HttpStatus.NOT_FOUND).json({
        message: "Email not found",
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error checking email",
        error: error.message,
      });
    }
  }

  @Put('/reset') 
  async resetPassword(@Res() response: any, @Body() body: { email: string; password: string }) {
    try {
      const updatedUser = await this.loginService.updatePassword(body.email, body.password);
      if (updatedUser) {
        return response.status(HttpStatus.OK).json({
          message: "Password updated successfully",
        });
      }
      return response.status(HttpStatus.NOT_FOUND).json({
        message: "User not found",
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Error updating password",
        error: error.message,
      });
    }
  }

}
