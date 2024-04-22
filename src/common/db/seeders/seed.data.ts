import { RoleEnum } from '@common/@types/enums';

export const SYSTEM_DATA = {
  roles: [
    {
      id: RoleEnum.SUPER_ADMIN,
      name: 'Super Administrator',
    },
    {
      id: RoleEnum.ADMIN,
      name: 'Administrator',
    },
    {
      id: RoleEnum.USER,
      name: 'User',
    },
  ],
};
