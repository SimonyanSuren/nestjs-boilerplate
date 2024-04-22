import { type IConfiguration } from '@lib/config/config.interface';
import { type UserDto } from '@modules/user/dtos/user.dto';
import { type NextFunction, type Request, type Response } from 'express';

/* The `export {};` statement is used to indicate that the file is a module and exports nothing. It is
often used in TypeScript files that only contain type declarations or interfaces, without any actual
code or exports. This statement ensures that the file is treated as a module and not as a script. */
export {};

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/naming-convention
    export interface User extends UserDto {}

    // eslint-disable-next-line @typescript-eslint/naming-convention
    export interface Request {
      user?: UserDto;
    }
  }

  export type Configs = IConfiguration;

  export type ApiRequest = Request;
  export type ApiResponse = Response;
  export type ApiNextFunction = NextFunction;
}
