import { Module } from '@nestjs/common';
import { SignupController } from './signup.controller';
import { UserService } from '../user.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from 'src/schema/user.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: User.name,schema:UserSchema}])],
  controllers: [SignupController],
  providers: [UserService]
})
export class SignupModule {}
