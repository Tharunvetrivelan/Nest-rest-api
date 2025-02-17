import { MaxLength, isNotEmpty, IsNotEmpty,isString,IsString,IsStrongPassword,isStrongPassword } from "class-validator";
import * as bcrypt from 'bcryptjs';
export default class CreateSignupDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    readonly name:string;
    @IsNotEmpty()
    @IsString()
    password:string; 
}