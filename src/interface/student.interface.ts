import { Document } from "mongoose";


export interface IStudent extends Document{
     _id:string;
     name: string;
     roleNumber: number;
     class: number;
     gender: string;
     marks: number;
     lastModified?:Date;
     deletedAt?:Date|null;
}