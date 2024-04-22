/* eslint-disable @typescript-eslint/no-explicit-any */
import { type IncomingMessage } from 'node:http';
import path from 'node:path';

import { Environment } from '@common/@types/enums';
import { REQUEST_ID_HEADER, SWAGGER_API_ENDPOINT } from '@common/constants';
import { TypeOrmLogger } from '@common/db/orm-logger';
import { SnakeNamingStrategy } from '@common/db/snake-naming.strategy';
import { type UserDto } from '@modules/user/dtos/user.dto';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type JwtModuleOptions } from '@nestjs/jwt';
import { type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { stdTimeFunctions } from 'pino';
import { type Options as PinoHttpOptions } from 'pino-http';
import { type PrettyOptions } from 'pino-pretty';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ApiConfigService extends ConfigService<Configs, true> {
  private logger = new Logger(ApiConfigService.name);

  get env(): Environment {
    return this.get('app.NODE_ENV', { infer: true });
  }

  get isDevelopment(): boolean {
    return this.env === Environment.DEV;
  }

  get isProduction(): boolean {
    return this.env === Environment.PROD;
  }

  get isTest(): boolean {
    return this.env === Environment.TEST;
  }

  get appName(): string {
    return this.get('app.APP_NAME', { infer: true });
  }

  get apiPrefix(): string {
    return this.get('app.API_PREFIX', { infer: true });
  }

  get apiPort(): string {
    return this.get('app.API_PORT', { infer: true });
  }

  get apiVersion(): string {
    return this.get('app.API_VERSION', { infer: true });
  }

  get allowedOrigins(): boolean {
    return this.get('app.ALLOWED_ORIGINS', { infer: true });
  }

  get isDocumentationEnabled(): boolean {
    return this.get('app.ENABLE_DOCUMENTATION', { infer: true });
  }

  get appUrl(): string {
    return this.get('app.API_URL', { infer: true });
  }

  get swaggerUrl(): string {
    return `http://localhost:${this.apiPort}/${this.apiPrefix}/${SWAGGER_API_ENDPOINT}`;
  }

  get ormConfig(): TypeOrmModuleOptions {
    const entities = [
      path.join(__dirname, '..', '..', 'modules/**/*.entity{.ts,.js}'),
      path.join(__dirname, '..', '..', 'modules/**/*.view-entity{.ts,.js}'),
    ];

    const migrations = [path.join(__dirname, '..', '..', 'common/db/migrations/*{.ts,.js}')];

    return {
      type: 'postgres',
      name: 'default',
      host: this.get('database.DB_HOST', { infer: true }),
      port: this.get('database.DB_PORT', { infer: true }),
      username: this.get('database.DB_USERNAME', { infer: true }),
      password: this.get('database.DB_PASSWORD', { infer: true }),
      database: this.get('database.DB_NAME', { infer: true }),
      poolSize: this.get('database.DB_MAX_CONNECTIONS', { infer: true }),
      namingStrategy: new SnakeNamingStrategy(),
      logging: this.get('app.ENABLE_ORM_LOGS', { infer: true }) ? 'all' : false,
      logger: this.get('app.ENABLE_ORM_LOGS', { infer: true }) ? new TypeOrmLogger() : undefined,
      synchronize: this.get('database.DB_SYNCHRONIZE', { infer: true }),
      migrationsTransactionMode: 'each',
      migrationsTableName: 'migrations',
      migrationsRun: false,
      migrations,
      entities,
      subscribers: [],
      autoLoadEntities: true,
      cache: {},
      extra: {
        max: this.get('database.DB_MAX_CONNECTIONS', { infer: true }),
      },
    };
  }

  get authConfig(): JwtModuleOptions {
    return {
      privateKey: this.get('jwt.AUTH_JWT_PRIVATE_KEY', { infer: true }).trim(),
      publicKey: this.get('jwt.AUTH_JWT_PUBLIC_KEY', { infer: true }).trim(),
      signOptions: {
        algorithm: this.get('jwt.AUTH_JWT_ALGORITHM', { infer: true }),
        expiresIn: this.get('jwt.AUTH_JWT_EXPIRES_IN', { infer: true }),
      },
      verifyOptions: {
        algorithms: [this.get('jwt.AUTH_JWT_ALGORITHM', { infer: true })],
      },
    };
  }

  get loggerConfig(): PinoHttpOptions {
    const redactFields = [
      'password',
      'req.headers.authorization',
      'req.body.password',
      'req.body.rePassword',
      'req.body.token',
    ];

    return {
      name: this.appName,
      level: this.isProduction ? 'info' : 'trace',
      timestamp: stdTimeFunctions.isoTime,
      quietReqLogger: true,
      redact: {
        paths: redactFields,
        censor: '**GDPR COMPLIANT**',
      },
      genReqId: (req) => req.headers[REQUEST_ID_HEADER] || uuidv4(),
      customSuccessMessage: (req, res, responseTime) =>
        `${req.method} ${res.statusCode} ${req.url} completed in ${responseTime}ms`,
      customProps: (req: IncomingMessage & { user?: UserDto }): Record<string, any> => ({
        authUser: req.user ? { id: req.user.id, email: req.user.email } : null,
      }),
      formatters: {
        bindings: () => ({}),
        log: (log): Record<string, unknown> => {
          log.context = log.context ?? 'Request';

          return log;
        },
      },
      serializers: {
        req(request: {
          body: Record<string, any>;
          raw: {
            body: Record<string, any>;
          };
        }): Record<string, any> {
          request.body = request.raw.body;

          return request;
        },
      },
      transport: {
        targets: [
          {
            target: 'pino-pretty',
            level: this.isProduction ? 'info' : 'trace',
            options: {
              messageFormat: '[{context}] {req.headers.x-request-id} {msg}',
              translateTime: "yyyy-mm-dd'T'HH:MM:ss.l'Z'",
              ignore: 'pid,hostname,context,res,responseTime',
              errorLikeObjectKeys: ['err', 'error'],
              levelFirst: false,
              colorizeObjects: true,
              colorize: true,
              //singleLine: true,
              customColors: {
                message: 'green',
                info: 'blue',
                error: 'bgRed',
                warn: 'yellow',
                debug: 'magenta',
                trace: 'cyan',
                fatal: 'bgRed',
              },
            } as PrettyOptions,
          },
        ],
      },
    };
  }
}
