import { CoreApiResponse } from '@common/dtos/core-api-response.dto';
import { applyDecorators, type Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiResponse,
  type ApiResponseMetadata,
  getSchemaPath,
} from '@nestjs/swagger';

type ApiCustomOptions<T> = ApiResponseMetadata & {
  type: T;
  pagination?: boolean;
};

export function ApiCustomResponse<T extends Type>(options: ApiCustomOptions<T>): MethodDecorator {
  const { type, description, isArray, status } = options;
  const name = options.type.name.replace('Dto', isArray ? 's' : '').toLowerCase();
  const defaultDescription = `Success response with ${name} data.`;

  return applyDecorators(
    ApiExtraModels(CoreApiResponse),
    ApiExtraModels(options.type),
    ApiResponse({
      status,
      description: description || defaultDescription,
      schema: {
        allOf: [
          { $ref: getSchemaPath(CoreApiResponse) },
          {
            properties: {
              data: isArray
                ? {
                    type: 'array',
                    items: { $ref: getSchemaPath(type) },
                  }
                : { $ref: getSchemaPath(type) },
            },
          },
        ],
      },
    }),
  );
}
