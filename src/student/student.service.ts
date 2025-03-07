import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import CreateStudentDto from '../student/create-student.dto';
import { UpdateStudentDto } from '../student/update-student.dto';
import { IStudent } from '../interface/student.interface';
import { Student } from 'src/schema/student.schema';

@Injectable()
export class StudentService {
  constructor(@InjectModel(Student.name) private studentModel: Model<IStudent>) {}

  async createStudent(createStudentDto: CreateStudentDto): Promise<IStudent> {
    const existingStudent = await this.studentModel.findOne({ roleNumber: createStudentDto.roleNumber }).exec();
    if (existingStudent) {
      throw new NotFoundException(`Roll number ${createStudentDto.roleNumber} already exists. Please enter another roll number.`);
    }
    const newStudent = new this.studentModel(createStudentDto);
    return newStudent.save();
  }

  async updateStudent(studentId: string, updateStudentDto: UpdateStudentDto): Promise<IStudent> {
    const existingStudent = await this.studentModel.findByIdAndUpdate(studentId, updateStudentDto, { new: true });
    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return existingStudent;
  }

  async getAllStudents(
    skip: number,
    limit: number,
    sortField?: 'roleNumber' | 'name',
    sortOrder?: 'asc' | 'desc',
    search?: string,
  ): Promise<{ studentData: IStudent[], totalStudents: number }> {
    console.log('getAllStudents called with:', { skip, limit, sortField, sortOrder, search });
    const sortStage: PipelineStage[] = sortField && sortOrder
      ? [{ $sort: { [sortField]: sortOrder === 'asc' ? 1 : -1 } as const }]
      : [];
  
    const searchStage: PipelineStage[] = search
      ? [{
          $match: {
            $or: [
              { $expr: { $regexMatch: { input: { $toString: "$roleNumber" }, regex: search, options: 'i' } } }, // Convert roleNumber to string
              { name: { $regex: search, $options: 'i' } }, // Substring match for name
            ],
          },
        }]
      : [];
  
    const result = await this.studentModel.aggregate([
      ...searchStage,
      ...sortStage,
      {
        $facet: {
          studentData: [
            { $skip: skip },
            { $limit: limit },
          ],
          totalStudents: [
            { $count: 'count' },
          ],
        },
      },
      {
        $project: {
          studentData: 1,
          totalStudents: { $arrayElemAt: ['$totalStudents.count', 0] },
        },
      },
    ]);
  
    console.log('Result:', JSON.stringify(result[0]?.studentData, null, 2));
    if (!result.length || !result[0].studentData.length) {
      throw new NotFoundException('Students data not found!');
    }
  
    return {
      studentData: result[0].studentData,
      totalStudents: result[0].totalStudents || 0,
    };
  }
  async getStudent(studentId: string): Promise<IStudent> {
    const existingStudent = await this.studentModel.findById(studentId).exec();
    if (!existingStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return existingStudent;
  }

  async deleteStudent(studentId: string): Promise<IStudent> {
    const deleteStudent = await this.studentModel.findByIdAndDelete(studentId);
    if (!deleteStudent) {
      throw new NotFoundException(`Student #${studentId} not found`);
    }
    return deleteStudent;
  }
}