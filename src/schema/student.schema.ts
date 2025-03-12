import { Prop, Schema,SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })
export class Student{
    @Prop({required:true})
    name:string;
    @Prop()
    roleNumber: number;
    @Prop()
    class: number;
    @Prop()
    gender: string;
    @Prop()
    marks: number;
    @Prop({default: Date.now})
    lastModified:Date;
    @Prop({type:Date,default:null})
    deletedAt:Date|null
}

export const StudentSchema = SchemaFactory.createForClass(Student);


StudentSchema.pre('save',function(next){
    this.lastModified = new Date();
    next()
})
StudentSchema.pre(['findOneAndUpdate','updateOne'],function(next){
    this.set({lastModified:new Date()});
    next();
})