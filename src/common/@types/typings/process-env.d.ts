/* The `export {};` statement is used to indicate that the file is a module and exports nothing. It is
often used in TypeScript files that only contain type declarations or interfaces, without any actual
code or exports. This statement ensures that the file is treated as a module and not as a script. */
export {};

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      NODE_ENV: 'dev' | 'test' | 'prod';
      APP_NAME: string;
      API_PORT: string;
      API_PREFIX: string;
      API_VERSION: string;
      API_URL: string;
      CLIENT_URL: string;
      ALLOWED_ORIGINS?: string;
      ENABLE_DOCUMENTATION: string;
      ENABLE_ORM_LOGS: string;
      SWAGGER_USERNAME: string;
      SWAGGER_PASSWORD: string;
      SUPER_ADMIN_USERNAME: string;
      SUPER_ADMIN_PASSWORD: string;

      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_TYPE: 'postgres';
      DB_SYNCHRONIZE: string;
      DB_MAX_CONNECTIONS: number;
      DB_SSL_ENABLED: boolean;
      DB_REJECT_UNAUTHORIZED: boolean;

      AUTH_JWT_PUBLIC_KEY: string;
      AUTH_JWT_PRIVATE_KEY: string;
      AUTH_JWT_ALGORITHM: string;
      AUTH_JWT_EXPIRES_IN: string;

      REDIS_URI: string;
      REDIS_HOST: string;
      REDIS_PORT: number;
      REDIS_USERNAME: string;
      REDIS_PASSWORD: string;
      REDIS_TTL: number;
    }
  }
}
