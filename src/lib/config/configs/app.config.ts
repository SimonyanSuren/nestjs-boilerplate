/* eslint-disable @typescript-eslint/naming-convention */
import process from 'node:process';

import { Environment } from '@common/@types/enums';
import { VERSION_VALIDATION_MESSAGE } from '@common/constants';
import { registerAs } from '@nestjs/config';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Matches,
} from 'class-validator';

import { validateConfigs } from '../config.validator';

export const APP_CONFIG_KEY = 'app';

// Validation class

class AppConfig {
  @IsString()
  @IsNotEmpty()
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsInt()
  API_PORT: number;

  @IsString()
  @IsNotEmpty()
  API_PREFIX: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^v\d+/, { message: VERSION_VALIDATION_MESSAGE })
  API_VERSION: string;

  @IsUrl({ require_tld: false })
  API_URL: string;

  @IsString()
  @IsNotEmpty()
  APP_NAME: string;

  @IsUrl({ require_tld: false })
  CLIENT_URL: string;

  @IsDefined()
  @Transform(({ value }) => (typeof value === 'string' ? value.split(',') : '*'))
  ALLOWED_ORIGINS: string | string[] = '*';

  @IsBoolean()
  @Transform(({ value }) => (value === 'false' ? false : value === 'true' ? true : value))
  ENABLE_DOCUMENTATION = false;

  @IsBoolean()
  @Transform(({ value }) => (value === 'false' ? false : value === 'true' ? true : value))
  ENABLE_ORM_LOGS = false;

  @IsString()
  @IsNotEmpty()
  SWAGGER_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  SWAGGER_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  SUPER_ADMIN_PASSWORD: string;
}

// Register configurations after validation
export const app = registerAs(APP_CONFIG_KEY, async () => validateConfigs(process.env, AppConfig));
