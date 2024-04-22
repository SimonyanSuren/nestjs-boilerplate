//import { SuccessInterceptor } from '@common/interceptors/success.interceptor';
import { AuthModule } from '@modules/auth/auth.module';
import { InfrastructureModule } from '@modules/infrastructure/infrastructure.module';
import { UsersModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule, AuthModule, UsersModule],
})
export class AppModule {}
