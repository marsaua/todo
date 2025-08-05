import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ActiveUserType } from '../enums/active-user-type';
import { REQUEST_USER_KEY } from '../constants/auth.constants';

export const ActiveUser = createParamDecorator(
  (field: keyof ActiveUserType | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ActiveUserType = request[REQUEST_USER_KEY];
    return field ? user?.[field] : user;
  },
);
