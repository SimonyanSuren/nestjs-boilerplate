import { type IErrorDetails } from '@common/@types';
import { Codes, REQUEST_ID_HEADER } from '@common/constants';
import { CoreApiErrorResponse } from '@common/dtos/core-error-response.dto';
import {
  type ArgumentsHost,
  Catch,
  type ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { type Request, type Response } from 'express';

@Catch()
export class CoreExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(CoreExceptionsFilter.name);

  catch(exception: Error, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const req: Request = ctx.getRequest<Request>();
    const res: Response = ctx.getResponse<Response>();
    const path = req.url;
    const timestamp = new Date().toISOString();
    const requestId = req.headers[REQUEST_ID_HEADER] as string;
    const authUser = req.user ? { id: req.user.id, email: req.user.email } : null;

    // Set to internal server error in case it did not match under error types.
    let statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorName = Codes.INTERNAL_SERVER_ERROR.errorName!;
    let message = Codes.INTERNAL_SERVER_ERROR.message;
    let code = Codes.INTERNAL_SERVER_ERROR.code;
    let stack: unknown;

    switch (true) {
      case exception instanceof HttpException:
        statusCode = exception.getStatus();
        errorName = exception.constructor.name.replaceAll(/([a-z])([A-Z])/g, '$1 $2');
        message = (exception.getResponse() as IErrorDetails).message || exception.message;
        code = (exception.getResponse() as IErrorDetails).code;
        stack = exception.stack;
        break;

      case exception instanceof Error:
        errorName = exception.constructor.name;
        message = exception.message;
        stack = exception.stack;
        break;
    }

    const error = CoreApiErrorResponse.error(
      statusCode,
      code,
      message,
      errorName,
      path,
      requestId,
      timestamp,
    );

    this.logger.error({ error: { ...error, authUser } }, stack);

    res.status(statusCode).json(error);
  }
}
