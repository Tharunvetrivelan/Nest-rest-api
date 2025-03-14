import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: Error | null, user: any | false, info: any, context: ExecutionContext) {
    if (err || !user) {
      throw new UnauthorizedException('Unauthorized - Token expired or invalid');
    }
    return user;
  }
}
