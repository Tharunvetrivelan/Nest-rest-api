import { isNotEmpty, IsNotEmpty, IsString, Max, max, MaxLength, maxLength,IsEmail } from "class-validator";

export default class LoginDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @IsEmail()
    readonly name: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}