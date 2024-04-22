import process from 'node:process';

import { registerAs } from '@nestjs/config';
import { IsInt, IsNotEmpty, IsOptional, IsPort, IsString, Min } from 'class-validator';

import { validateConfigs } from '../config.validator';

export const REDIS_CONFIG_KEY = 'redis';

// Validation schema

export class RedisConfig {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  REDIS_URI: string;

  @IsString()
  @IsNotEmpty()
  REDIS_HOST: string;

  @IsPort()
  REDIS_PORT: number;

  @IsInt()
  @Min(1)
  REDIS_TTL: number;

  @IsString()
  @IsNotEmpty()
  REDIS_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  REDIS_PASSWORD: string;
}

// Register configurations after validation
export const redis = registerAs(REDIS_CONFIG_KEY, async () =>
  validateConfigs(process.env, RedisConfig),
);
