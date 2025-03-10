import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './student/student.module';
import { SignupModule } from './signup/signup.module';
import { LoginModule } from './login/login.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/',{dbName:'gunadb'}), StudentModule, SignupModule, LoginModule  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
