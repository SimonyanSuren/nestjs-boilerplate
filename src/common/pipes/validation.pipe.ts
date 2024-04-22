import { AppUtils } from '@common/helpers';
import { ValidationPipe as NestValidationPipe } from '@nestjs/common';

export class ValidationPipe extends NestValidationPipe {
  constructor() {
    super(AppUtils.validationPipeOptions());
  }
}
