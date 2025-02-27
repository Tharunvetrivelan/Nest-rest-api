import { Module } from '@nestjs/common';
import { UserService } from '../user.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Document } from 'mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),JwtModule.register({
    secret: 'secretKey', 
    signOptions: { expiresIn: '1h' }, 
  })],
  providers: [UserService], 
  controllers: [LoginController]
})
export class LoginModule {}
