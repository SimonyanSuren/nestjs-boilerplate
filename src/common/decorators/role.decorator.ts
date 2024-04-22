import { type RoleEnum } from '@common/@types/enums';
import { ROLES_KEY } from '@common/constants';
import { type CustomDecorator, SetMetadata } from '@nestjs/common';

export const Roles = (...roles: RoleEnum[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles);
