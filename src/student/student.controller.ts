import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/login/auth.guard';
import CreateStudentDto from '../student/create-student.dto';
import { UpdateStudentDto } from '../student/update-student.dto';
import { StudentService } from '../student/student.service';
import { Response } from 'express';

@Controller('/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createStudent(@Res() response: Response, @Body() createStudentDto: CreateStudentDto) {
    try {
      const newStudent = await this.studentService.createStudent(createStudentDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Student has been created successfully',
        newStudent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateStudent(
    @Res() response: Response,
    @Param('id') studentId: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    try {
      const existingStudent = await this.studentService.updateStudent(studentId, updateStudentDto);
      return response.status(HttpStatus.OK).json({
        message: 'Student has been successfully updated',
        existingStudent,
      });
    } catch (err) {
      return response.status(err.status || HttpStatus.BAD_REQUEST).json({
        message: err.message || 'Error: Student not updated!',
        error: 'Bad Request',
      });
    }
  }

  @Get()
  async getStudents(
    @Res() response: Response,
    @Query('skip') skip = 0,
    @Query('limit') limit = 10,
    @Query('sortField') sortField?: 'roleNumber' | 'name',
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('search') search?: string, // New search parameter
  ) {
    try {
      const result = await this.studentService.getAllStudents(
        Number(skip),
        Number(limit),
        sortField,
        sortOrder,
        search,
      );
      return response.status(HttpStatus.OK).json({
        message: 'All students data found successfully',
        studentData: result.studentData,
        totalStudents: result.totalStudents,
      });
    } catch (err) {
      return response.status(err.status || HttpStatus.BAD_REQUEST).json({
        message: err.message || 'Error: Could not fetch students!',
        error: 'Bad Request',
      });
    }
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  validateToken() {
    return { isValid: true };
  }

  @Get('/:id')
  async getStudent(@Res() response: Response, @Param('id') studentId: string) {
    try {
      const existingStudent = await this.studentService.getStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student found successfully',
        existingStudent,
      });
    } catch (err) {
      return response.status(err.status || HttpStatus.BAD_REQUEST).json({
        message: err.message || 'Error: Student not found!',
        error: 'Bad Request',
      });
    }
  }

  @Delete('/:id')
  async deleteStudent(@Res() response: Response, @Param('id') studentId: string) {
    try {
      const deletedStudent = await this.studentService.deleteStudent(studentId);
      return response.status(HttpStatus.OK).json({
        message: 'Student deleted successfully',
        deletedStudent,
      });
    } catch (err) {
      return response.status(err.status || HttpStatus.BAD_REQUEST).json({
        message: err.message || 'Error: Student not deleted!',
        error: 'Bad Request',
      });
    }
  }
}