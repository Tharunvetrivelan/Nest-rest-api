import { Module } from '@nestjs/common';
import { UserService } from '../user.service';
import { LoginController } from './login.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Document } from 'mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:UserSchema}]),JwtModule.register({
    secret: 'secretKey', 
    signOptions: { expiresIn: '1h' }, 
  }),PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [UserService,JwtStrategy], 
  controllers: [LoginController],
  exports:[PassportModule,JwtModule],
})
export class LoginModule {}
