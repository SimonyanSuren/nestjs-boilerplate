import { type RoleEnum } from '../enums';

export interface IJwtPayload {
  sub: number;
  iss: string;
  exp?: number;
  iat?: number;
  role: RoleEnum;
  jti?: number;
}
