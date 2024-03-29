import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs';

export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, handler: CallHandler) {

    return handler.handle().pipe(
      map((data) => {
        console.log('This is Intercepting the response');
        const response = {
          ...data,
          createdAtMamad: data.created_at,
        };
        delete response.created_at;
        delete response.updated_at;

        return response;
      }),
    );
  }
}
