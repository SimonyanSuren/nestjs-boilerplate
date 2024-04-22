import { type IErrorDetails } from '@common/@types';

export class Codes {
  static INTERNAL_SERVER_ERROR: IErrorDetails = {
    code: 0,
    message: 'Internal server error.',
    errorName: 'Internal Server Exception',
  };

  static VALIDATION_ERROR: IErrorDetails = { code: 2, message: {} };

  static FORBIDDEN_ERROR: IErrorDetails = {
    code: 3,
    message: 'Permission denied.',
  };

  static NOT_FOUND_ERROR: IErrorDetails = {
    code: 4,
    message: 'The requested resource was not found.',
  };

  static UNAUTHORIZED_ERROR: IErrorDetails = {
    code: 5,
    message: 'Unauthorized request. Authorization token is missing or expired.',
  };

  static ALREADY_REGISTERED_ERROR: IErrorDetails = { code: 6, message: 'User already registered.' };

  static WRONG_EMAIL_OR_PASSWORD_ERROR: IErrorDetails = {
    code: 7,
    message: 'Wrong email or password.',
  };
}
