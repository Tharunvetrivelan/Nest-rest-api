import { isNotEmpty, IsNotEmpty, IsString, Max, max, MaxLength, maxLength, } from "class-validator";

export default class LoginDto{
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    readonly name: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}