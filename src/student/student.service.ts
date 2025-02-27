import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import CreateStudentDto from '../student/create-student.dto';
import { UpdateStudentDto } from '../student/update-student.dto';
import { IStudent } from '../interface/student.interface';
import { Student } from 'src/schema/student.schema';

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student.name) private studentModel:Model<IStudent>){ }

    async createStudent(createStudentDto: CreateStudentDto):Promise<IStudent>{
        const existingStudent = await this.studentModel.findOne({ rollNumber: createStudentDto.roleNumber }).exec();

    if (existingStudent) {
        throw new NotFoundException(`Roll number ${createStudentDto.roleNumber} already exists. Please enter another roll number.`);
    }
        const newStudent = await new this.studentModel(createStudentDto);
        return newStudent.save();
}

async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<IStudent>{
    const existingStudent = await this.studentModel.findByIdAndUpdate(studentId,updateStudentDto, {new: true});

    if (!existingStudent){
        throw new NotFoundException(`Student #${studentId} not found`);
    }
    return existingStudent;
}

async getAllStudents(skip: number, limit: number): Promise<{ studentData: IStudent[], totalStudents: number }> {
    const studentData = await this.studentModel.find().skip(skip).limit(limit);
    const totalStudents = await this.studentModel.countDocuments();
//aggregation
    if (!studentData || studentData.length === 0) {
        throw new NotFoundException('Students data not found!');
    }

    return { studentData, totalStudents };
}


async getStudent(studentId: string): Promise<IStudent>{
    const existingStudent = await this.studentModel.findById(studentId).exec();

    if(!existingStudent){
        throw new NotFoundException(`Student #${studentId} not found`)
    }
    return existingStudent;
}

async deleteStudent(studentId: string): Promise<IStudent>{
    const deleteStudent = await this.studentModel.findByIdAndDelete(studentId);

    if (!deleteStudent){
        throw new NotFoundException(`Student #${studentId} not found`);
        
    }
    return deleteStudent;
}
}

