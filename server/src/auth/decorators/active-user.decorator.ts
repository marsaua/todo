import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST_USER_KEY } from '../constants/auth.constants';
import { ActiveUserType } from '../enums/active-user-type';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserType | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = (req[REQUEST_USER_KEY] ?? req.user) as
      | ActiveUserType
      | undefined;
    if (!user) throw new UnauthorizedException('Missing auth payload');

    return field ? (user as any)[field] : user;
  },
);
