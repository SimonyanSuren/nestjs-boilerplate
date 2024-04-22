import { CoreApiResponse } from '@common/dtos/core-api-response.dto';
import {
  type CallHandler,
  type ExecutionContext,
  Injectable,
  type NestInterceptor,
} from '@nestjs/common';
import { type Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessInterceptor<T> implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<CoreApiResponse<T>> {
    return next.handle().pipe(map<T, CoreApiResponse<T>>((data) => CoreApiResponse.success(data)));
  }
}
