import process from 'node:process';

import { JWT_EXPIRY_REGEX } from '@common/constants';
import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

import { validateConfigs } from '../config.validator';

export const JWT_CONFIG_KEY = 'jwt';

// Validation class

class JwtConfig {
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  AUTH_JWT_PUBLIC_KEY: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  AUTH_JWT_PRIVATE_KEY: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  AUTH_JWT_ALGORITHM = 'RS256';

  @IsString()
  @IsNotEmpty()
  @Matches(JWT_EXPIRY_REGEX)
  AUTH_JWT_EXPIRES_IN: string;
}

// Register configurations after validation
export const jwt = registerAs(JWT_CONFIG_KEY, async () => validateConfigs(process.env, JwtConfig));
