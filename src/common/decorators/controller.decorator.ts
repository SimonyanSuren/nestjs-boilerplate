import { applyDecorators, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { upperCase } from 'lodash';

export function DecoratedController(name: string, secured = true): ClassDecorator {
  const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [
    ApiTags(upperCase(name)),
    Controller(name),
  ];

  if (secured) decorators.push(ApiBearerAuth('JWT'));

  return applyDecorators(...decorators);
}
