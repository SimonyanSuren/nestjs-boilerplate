/* eslint-disable n/no-process-exit */
/* eslint-disable unicorn/no-process-exit */
import { type IncomingMessage } from 'node:http';
import process from 'node:process';

import {
  SWAGGER_API_CURRENT_VERSION,
  SWAGGER_API_ENDPOINT,
  SWAGGER_DESCRIPTION,
  SWAGGER_TITLE,
} from '@common/constants';
import { swaggerOptions } from '@common/swagger/swagger.plugin';
import { type ApiConfigService } from '@lib/config/api-config.service';
import {
  BadRequestException,
  type HttpException,
  type INestApplication,
  type INestApplicationContext,
  Logger,
  type ValidationPipeOptions,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer, type ValidationError } from 'class-validator';
import basicAuth from 'express-basic-auth';
import { getMiddleware } from 'swagger-stats';

import { Codes } from '../constants/error-code.constants';
import { HelperService } from './helpers.utils';

const logger = new Logger('App:Utils');

export const AppUtils = {
  // Global validation pipe options
  validationPipeOptions(): ValidationPipeOptions {
    return {
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      enableDebugMessages: HelperService.isDev(),
      exceptionFactory: (validationErrors: ValidationError[] = []): HttpException => {
        Codes.VALIDATION_ERROR.message = HelperService.formatErrors(validationErrors);

        return new BadRequestException(Codes.VALIDATION_ERROR);
      },
    };
  },

  /*
   * Use application context container for class-validator and class-transformer
   * This is required for DI in custom decorators
   */
  initContainerForValidator(module: INestApplicationContext): void {
    useContainer(module, { fallbackOnErrors: true });
  },

  // Handle graceful shutdown
  async gracefulShutdown(app: INestApplication, code: string): Promise<void> {
    // Force exit after 5 seconds
    setTimeout(() => process.exit(1), 5000);
    logger.verbose(`Signal received with code ${code} ⚡.`);
    logger.log('❗Closing http server with grace.');

    try {
      await app.close();
      logger.log('✅ Http server closed.');
      process.exit(0);
    } catch (error: unknown) {
      logger.error(`❌ Http server closed with error: ${error}`);
      process.exit(1);
    }
  },

  killAppWithGrace(app: INestApplication): void {
    process.on('SIGINT', async () => {
      await AppUtils.gracefulShutdown(app, 'SIGINT');
    });

    process.on('SIGTERM', async () => {
      await AppUtils.gracefulShutdown(app, 'SIGTERM');
    });
  },

  // Swagger setup
  setupSwagger(app: INestApplication, configService: ApiConfigService): void {
    const userName = configService.get('app.SWAGGER_USERNAME', { infer: true });
    const passWord = configService.get('app.SWAGGER_PASSWORD', { infer: true });
    const appName = configService.get('app.APP_NAME', { infer: true });
    const apiPrefix = configService.get('app.API_PREFIX', { infer: true });

    const options = new DocumentBuilder()
      .setTitle(SWAGGER_TITLE)
      .addServer(`/${apiPrefix}`)
      .setDescription(SWAGGER_DESCRIPTION)
      .setVersion(SWAGGER_API_CURRENT_VERSION)
      .addBearerAuth(
        {
          name: 'JWT',
          type: 'http',
          in: 'header',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'JWT token',
        },
        'JWT',
      )
      .build();

    const document = SwaggerModule.createDocument(app, options, { ignoreGlobalPrefix: true });

    if (configService.isProduction) {
      app.use(
        `/${apiPrefix}/${SWAGGER_API_ENDPOINT}`,
        basicAuth({
          challenge: true,
          users: { [userName]: passWord },
        }),
      );
    }

    // Swagger stats setup
    app.use(
      getMiddleware({
        swaggerSpec: document,
        authentication: configService.isProduction,
        hostname: appName,
        uriPath: `/${apiPrefix}/stats`,
        onAuthenticate: (_request: IncomingMessage, username: string, password: string) =>
          username === userName && password === passWord,
      }),
    );

    SwaggerModule.setup(SWAGGER_API_ENDPOINT, app, document, {
      explorer: true,
      useGlobalPrefix: true,
      customSiteTitle: `${appName} Documentation`,
      //customCssUrl: './../swagger/swagger.dark.css',
      swaggerOptions,
    });
  },
};
