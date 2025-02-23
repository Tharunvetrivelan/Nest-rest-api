import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {IsEmail, IsStrongPassword} from "class-validator";
import { Document } from 'mongoose';
@Schema()
export class User extends Document{ //{required:true}
    @Prop()
    @IsEmail()
    name:string;
    @Prop()
    @IsStrongPassword()
    password:string;   
}

export const UserSchema = SchemaFactory.createForClass(User);
