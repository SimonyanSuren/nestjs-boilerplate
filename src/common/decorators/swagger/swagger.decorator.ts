import { type IErrorDetails } from '@common/@types';
import { Codes } from '@common/constants';
import { CoreApiErrorResponse } from '@common/dtos/core-error-response.dto';
import { applyDecorators, HttpStatus, type Type } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ApiCustomResponse } from './swagger-response.decorator';

interface ISwaggerOptions<T = unknown, K = unknown> {
  response?: Type<K>;
  body?: Type<T>;
  status?: number;
  isArray?: boolean;
  isPublic?: boolean;
  operation: string;
  description?: string;
  params?: Array<{ name: string; required?: boolean; type: Type }>;
  notFound?: string;
  badRequest?: string;
  forbidden?: string;
  unauthorized?: string;
}

export function ApiErrorResponse(
  statusCode = 400,
  payload?: IErrorDetails,
): typeof CoreApiErrorResponse {
  class Extended extends CoreApiErrorResponse {
    @ApiProperty({ type: Number, example: statusCode })
    public declare statusCode: number;

    @ApiProperty({ type: String, example: payload?.message })
    public declare message: string;

    @ApiProperty({ type: Number, example: payload?.code })
    public declare code: number;
  }

  Object.defineProperty(Extended, 'name', {
    value: `ApiErrorResponse ${statusCode}`,
  });

  return Extended;
}

export function Swagger(options: ISwaggerOptions): MethodDecorator {
  const {
    operation,
    params,
    body,
    response,
    badRequest = 'Bad request exception. The request was malformed.',
    notFound = 'Not found exception. The requested resource was not found.',
    forbidden = 'Forbidden request. You are not allowed to perform this action.',
    unauthorized = 'Unauthorized request. Authorization token is missing or expired.',
    status = HttpStatus.OK,
    isArray = false,
    isPublic = false,
  } = options;

  const decorators = [
    ApiOperation({ summary: operation }),

    // Default error response for internal server error
    ApiInternalServerErrorResponse({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'Internal server error. Something went wrong.',
      type: ApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, Codes.INTERNAL_SERVER_ERROR),
    }),
  ];

  if (params) {
    for (const param of params) {
      const { name, required = true, type } = param;
      decorators.push(ApiParam({ name, required, type }));
    }
  }

  if (body) {
    decorators.push(ApiBody({ type: body, required: true }));
  }

  if (badRequest) {
    decorators.push(
      ApiBadRequestResponse({
        status: HttpStatus.BAD_REQUEST,
        description: badRequest,
        type: ApiErrorResponse(HttpStatus.BAD_REQUEST, Codes.VALIDATION_ERROR),
      }),
    );
  }

  if (notFound) {
    decorators.push(
      ApiNotFoundResponse({
        status: HttpStatus.NOT_FOUND,
        description: notFound,
        type: ApiErrorResponse(HttpStatus.NOT_FOUND, Codes.NOT_FOUND_ERROR),
      }),
    );
  }

  if (forbidden) {
    decorators.push(
      ApiForbiddenResponse({
        status: HttpStatus.FORBIDDEN,
        description: forbidden,
        type: ApiErrorResponse(HttpStatus.FORBIDDEN, Codes.FORBIDDEN_ERROR),
      }),
    );
  }

  if (unauthorized && !isPublic) {
    decorators.push(
      ApiUnauthorizedResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: unauthorized,
        type: ApiErrorResponse(HttpStatus.UNAUTHORIZED, Codes.WRONG_EMAIL_OR_PASSWORD_ERROR),
      }),
    );
  }

  if (response) {
    decorators.push(ApiCustomResponse({ status, isArray, type: response }));
  }

  return applyDecorators(...decorators);
}
