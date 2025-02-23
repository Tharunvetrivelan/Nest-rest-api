import { MaxLength, isNotEmpty, IsNotEmpty,isString,IsString,IsStrongPassword,isStrongPassword, IsEmail } from "class-validator";
import * as bcrypt from 'bcryptjs';
export default class CreateSignupDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @IsEmail()
    readonly name:string;
    @IsNotEmpty()
    @IsString()
    password:string; 
}