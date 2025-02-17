import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Model, NullExpression } from 'mongoose';
import { ILogin } from 'src/interface/login.interface';
import { InjectModel } from '@nestjs/mongoose';
import { ISignup } from 'src/interface/signup.interface';
import CreateSignupDto from './signup/create-signup.dto';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class UserService {
    // constructor(@Injectable(Signup.name) private loginModel:Model<ILogin>){}
    constructor(@InjectModel(User.name) private userModel:Model<ISignup>){
    }
    // static userService = new UserService();
    async createSignup(createSignupDto:CreateSignupDto):Promise<ISignup> {
        createSignupDto.password = await bcrypt.hash(createSignupDto.password,10);
        const newSignup = await new this.userModel(createSignupDto); 
        return newSignup.save();
     }

    //  async findOne(username: string):Promise<User | null| undefined>{
    //     return this.userModel.findOne({username});
    //  }

     async validateUser(username:string, password:string): Promise<User | null>{
        const cuser = await this.userModel.findOne({username});
        const hashedpass = await bcrypt.hash(password,10);
        if(cuser == null){
            return null;
        }
        if(cuser && await bcrypt.compare(password,cuser.password)){
            return cuser;
        }
        return null;
     }
    
     
}