import { ApiConfigModule } from '@lib/config/api-config.module';
import { ApiConfigService } from '@lib/config/api-config.service';
import { Global, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

@Global()
@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ApiConfigModule],
      inject: [ApiConfigService],
      useFactory: (configService: ApiConfigService) => ({ pinoHttp: configService.loggerConfig }),
    }),
  ],
  providers: [],
  exports: [],
})
export class AppLoggerModule {}
