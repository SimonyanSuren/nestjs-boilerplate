/* eslint-disable canonical/filename-match-exported */
import { type RoleEnum } from '@common/@types/enums';
import { Codes, ROLES_KEY } from '@common/constants';
import {
  type CanActivate,
  type ExecutionContext,
  ForbiddenException,
  Injectable,
  mixin,
  type Type,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const RoleGuard = (...roles: RoleEnum[]): Type<CanActivate> => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<ApiRequest>();
      const user = request.user;
      const handlerRoles =
        this.reflector.get<RoleEnum[] | undefined>(ROLES_KEY, context.getHandler()) || [];
      const mergedRequiredRoles = [...roles, ...handlerRoles];

      if (user?.roleId && mergedRequiredRoles.includes(user.roleId)) return true;

      throw new ForbiddenException(Codes.FORBIDDEN_ERROR);
    }
  }

  return mixin(RoleGuardMixin);
};
