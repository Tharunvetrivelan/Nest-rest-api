import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model} from 'mongoose';
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
    async createSignup(createSignupDto:CreateSignupDto) {
        const { name } = createSignupDto;
        const emailInUse = await this.userModel.findOne({name}) as User;
        if(emailInUse){
            throw new BadRequestException("Email already in use");
        }
        else{createSignupDto.password = await bcrypt.hash(createSignupDto.password,10);
        const newSignup = await new this.userModel(createSignupDto); 
        return newSignup.save();}
     }

     async validateUser(username:string, password:string): Promise<User | null>{
        
        const cuser = await this.userModel.findOne({ name: username }) as User; 
        if(cuser && await bcrypt.compare(password,cuser.password)){
            // console.log("User returned")
            
            return cuser;
        }
        return null;
     }
    
     async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userModel.findOne({ name : email }); 
        return user; 
      }
      async updatePassword(email: string, newPassword: string): Promise<User|null> {
        const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds); 
    const user = await this.userModel.findOneAndUpdate(
      { name:email }, 
      { password: hashedPassword }, 
      { new: true } 
    );
    return user;
      }
     
}