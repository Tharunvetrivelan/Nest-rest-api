import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User{ //{required:true}
    @Prop()
    name:string;
    @Prop()
    password:string;   
}

export const UserSchema = SchemaFactory.createForClass(User);
