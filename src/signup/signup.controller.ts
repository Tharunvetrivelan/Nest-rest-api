import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { StudentService } from 'src/student/student.service';
import { UserService } from '../user.service';

import { response } from 'express';
import CreateSignupDto from './create-signup.dto';
import { error } from 'console';

@Controller('/signup')
export class SignupController {
    constructor(private readonly signupService: UserService){}

    @Post()
    async createSignup(@Res() response : any, @Body() createSignupDto:CreateSignupDto){
        try{
            const newSignup =  await this.signupService.createSignup(createSignupDto);
            return response.status(HttpStatus.CREATED).json({
                message: 'Account has been created successfully',
                newSignup
            });
        }
        catch(err){
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode:400,
                message:"Error:the account was not created",
                error: 'Bad request'
            })
        }
    }

}
