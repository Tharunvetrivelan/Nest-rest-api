import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Query } from '@nestjs/common';
import CreateStudentDto from '../student/create-student.dto';
import {UpdateStudentDto} from '../student/update-student.dto'
import { StudentService } from '../student/student.service';
@Controller("/student")
export class StudentController {
   constructor(private readonly studentService: StudentService) { }

@Post()
   async createStudent(@Res() response : any, @Body() createStudentDto: CreateStudentDto) {
  try {
    const newStudent = await this.studentService.createStudent(createStudentDto);
    return response.status(HttpStatus.CREATED).json({
    message: 'Student has been created successfully',
    newStudent,});
 } catch (err) {
    return response.status(HttpStatus.BAD_REQUEST).json({
    statusCode: 400,
    message: 'Error: Student not created!',
    error: 'Bad Request'
 });
 }
}

@Put('/:id')
async updateStudent(@Res() response : any,@Param('id') studentId: string,@Body() updateStudentDto: UpdateStudentDto) {
  try {
   const existingStudent = await this.studentService.updateStudent(studentId, updateStudentDto);
  return response.status(HttpStatus.OK).json({
  message: 'Student has been successfully updated',
  existingStudent,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Get()
async getStudents(@Res() response: any, @Query('skip') skip = 0, @Query('limit') limit = 10) {
    try {
        const result = await this.studentService.getAllStudents(Number(skip), Number(limit));
        return response.status(HttpStatus.OK).json({
            message: 'All students data found successfully',
            studentData: result.studentData,
            totalStudents: result.totalStudents,
        });
    } catch (err) {
        return response.status(err.status).json(err.response);
    }
}


@Get('/:id')
async getStudent(@Res() response : any, @Param('id') studentId: string) {
 try {
    const existingStudent = await
this.studentService.getStudent(studentId);
    return response.status(HttpStatus.OK).json({
    message: 'Student found successfully',existingStudent,});
 } catch (err) {
   return response.status(err.status).json(err.response);
 }
}

@Delete('/:id')
async deleteStudent(@Res() response :any, @Param('id') studentId: string)
{
  try {
    const deletedStudent = await this.studentService.deleteStudent(studentId);
    return response.status(HttpStatus.OK).json({
    message: 'Student deleted successfully',
    deletedStudent,});
  }catch (err) {
    return response.status(err.status).json(err.response);
  }
 }

}
