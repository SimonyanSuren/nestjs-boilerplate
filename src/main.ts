import 'reflect-metadata';

import { AppUtils } from '@common/helpers';
import { ApiConfigService } from '@lib/config/api-config.service';
import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, type NestExpressApplication } from '@nestjs/platform-express';
import compression from 'compression';
import helmet from 'helmet';
import { Logger as PinoLogger } from 'nestjs-pino';
import { initializeTransactionalContext } from 'typeorm-transactional';

import { AppModule } from './app.module';

const logger = new Logger('Bootstrap');

async function bootstrap(): Promise<void> {
  try {
    // Init transaction context for typeorm
    initializeTransactionalContext();

    const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(), {
      bufferLogs: true,
    });

    const configService = app.get(ApiConfigService);

    /*
     * Configure logger
     */
    app.useLogger(app.get(PinoLogger));
    /*
     * Configure api global prefix and version
     */
    app.setGlobalPrefix(configService.apiPrefix);
    app.enableVersioning({
      type: VersioningType.URI,
      // Api version config must be prefixed with 'v' therefore we slice the first character
      defaultVersion: configService.apiVersion.slice(1),
    });
    /*
     * Enable CORS
     */
    app.enableCors({
      origin: configService.allowedOrigins,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
      maxAge: 3600,
    });
    /**
     * Configure security middlewares
     */
    app.use(helmet());
    app.enable('trust proxy');
    app.set('etag', 'strong');
    /*
     * Enable compression
     */
    app.use(compression());
    /**
     * Configure global validation pipe
     */
    AppUtils.initContainerForValidator(app.select(AppModule));
    /**
     * Configure application gracefully shutdown
     */
    app.enableShutdownHooks();
    AppUtils.killAppWithGrace(app);
    /**
     * Configure swagger
     */
    if (configService.isDocumentationEnabled) AppUtils.setupSwagger(app, configService);

    // Start listening on the specified port
    await app.listen(configService.apiPort);

    if (configService.isDocumentationEnabled) {
      logger.log(`==========================================================`);
      logger.log(`📑 Swagger is running on: ${configService.swaggerUrl}`);
    }

    logger.log(`==========================================================`);
    logger.log(`🚦 Accepting request only from: ${configService.allowedOrigins.toString()}`);
    logger.log(`==========================================================`);
    logger.log(`🚀 Application is running on: ${configService.appUrl}`);
  } catch (error) {
    logger.error(error);
  }
}

void bootstrap();

process.on('uncaughtException', (err) => {
  logger.fatal(err, 'Uncaught exception detected');

  throw err;
});
