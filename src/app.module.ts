import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from './schema/student.schema';
import { StudentService } from './student/student.service';
import { StudentController } from './student/student.controller';
import { StudentModule } from './student/student.module';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/',{dbName:'gunadb'}), StudentModule, SignupModule, LoginModule  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
