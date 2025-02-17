import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from 'src/schema/student.schema';

@Module({imports: [MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema}])],
        controllers: [StudentController],
        providers: [StudentService],
})
export class StudentModule {}
