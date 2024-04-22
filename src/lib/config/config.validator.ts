/* eslint-disable @typescript-eslint/ban-types */
import { type ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export async function validateConfigs<T extends object>(
  env: Record<string, unknown>,
  envVariablesClass: ClassConstructor<T>,
): Promise<T> {
  const instance = plainToInstance(envVariablesClass, env, {
    // convert env properties based their type definition in classes
    enableImplicitConversion: true,
  });

  const errors = await validate(instance, { whitelist: true, skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(`Environment config validation error: ${errors.join(', ')}`);
  }

  return instance;
}
