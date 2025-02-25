import { IsNotEmpty, IsString} from "class-validator";

export default class ResetPassword{
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()
    confirmpassword: string;
}