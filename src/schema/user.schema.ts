import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
@Schema()
export class User extends Document{ //{required:true}
    @Prop()
    name:string;
    @Prop()
    password:string;   
}

export const UserSchema = SchemaFactory.createForClass(User);
