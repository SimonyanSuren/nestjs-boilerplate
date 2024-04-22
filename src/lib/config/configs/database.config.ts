import process from 'node:process';

import { registerAs } from '@nestjs/config';
import { Transform } from 'class-transformer';
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { validateConfigs } from '../config.validator';

export const DATABASE_CONFIG_KEY = 'database';

// Validation class

class DatabaseConfig {
  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @IsNumber()
  @IsInt()
  DB_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME: string;

  @IsString()
  @IsNotEmpty()
  DB_TYPE: string;

  @IsBoolean()
  @Transform(({ value }) => (value === 'false' ? false : value === 'true' ? true : value))
  DB_SYNCHRONIZE = false;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  DB_MAX_CONNECTIONS: string;
}
// Register configurations after validation
export const database = registerAs(DATABASE_CONFIG_KEY, async () =>
  validateConfigs(process.env, DatabaseConfig),
);
