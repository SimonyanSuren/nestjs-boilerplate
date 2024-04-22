import { type UserDto } from '@modules/user/dtos/user.dto';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: keyof UserDto, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<ApiRequest>();
    const user = request.user as UserDto;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    return data ? user[data] : user;
  },
);
