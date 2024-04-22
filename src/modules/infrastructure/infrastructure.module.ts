import { SeedService } from '@common/db/seeders/seed.service';
import { UniqueConstraint } from '@common/decorators';
import { CoreExceptionsFilter } from '@common/filters/core-exceptions.filter';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { RequestIdMiddleware } from '@common/middlewares/request-id.middleware';
import { ValidationPipe } from '@common/pipes/validation.pipe';
import { ApiConfigModule } from '@lib/config/api-config.module';
import { ApiConfigService } from '@lib/config/api-config.service';
import { AppLoggerModule } from '@lib/logger/logger.module';
import {
  ClassSerializerInterceptor,
  Global,
  type MiddlewareConsumer,
  Module,
  type NestInterceptor,
  type NestModule,
} from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE, Reflector } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { IsExistsConstraint } from '../../common/decorators/validators/is-exists.decorator';

@Global()
@Module({
  imports: [
    ApiConfigModule,
    AppLoggerModule,
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => configService.ormConfig,
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  providers: [
    SeedService,
    IsExistsConstraint,
    UniqueConstraint,
    {
      provide: APP_FILTER,
      useClass: CoreExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SuccessInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      inject: [Reflector],
      useFactory: (reflector: Reflector): NestInterceptor =>
        new ClassSerializerInterceptor(reflector),
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class InfrastructureModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(RequestIdMiddleware).forRoutes('*');
  }
}
