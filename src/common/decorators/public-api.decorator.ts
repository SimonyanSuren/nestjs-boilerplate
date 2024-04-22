import { IS_PUBLIC_KEY } from '@common/constants';
import { type CustomDecorator, SetMetadata } from '@nestjs/common';

export const Public = (): CustomDecorator => SetMetadata(IS_PUBLIC_KEY, true);
