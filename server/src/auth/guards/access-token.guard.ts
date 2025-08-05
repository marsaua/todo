import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from 'src/auth/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../constants/auth.constants';
import { Request as ExpressRequest } from 'express';

interface RequestWithCookies extends ExpressRequest {
  cookies: Record<string, string>;
}
@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //Extract the request object from the execution context
    const request = context.switchToHttp().getRequest();
    //Extract the token from the request header
    const token = this.extractRequestFromHeader(request);
    //Verify the token
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
      console.log(payload);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
  private extractRequestFromHeader(
    request: RequestWithCookies,
  ): string | undefined {
    const authHeader = request.headers['authorization'];
    if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1];
    }
    console.log(request.cookies);
    return request.cookies?.accessToken;
  }
}
