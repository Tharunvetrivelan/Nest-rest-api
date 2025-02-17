import { Module } from '@nestjs/common';
import { UserService } from '../user.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { LocalStrategy } from './local.strategy';
import { SignupModule } from 'src/signup/signup.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),PassportModule,SignupModule],
  providers: [UserService,LocalStrategy],
  controllers: [LoginController]
})
export class LoginModule {}
