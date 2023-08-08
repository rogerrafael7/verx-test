import { Injectable } from '@nestjs/common';
import {
  CustomException,
  CustomExceptionCode,
} from '@/infra/common/exceptions/custom.exception';

@Injectable()
export class ExceptionFilter {
  catch(exception: any, host: any): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = 400;
    let { message, code } = exception;
    if (exception instanceof CustomException) {
      message = exception.message;
      switch (exception.code) {
        case CustomExceptionCode.INVALID_PARAM:
          code = 400;
          break;
        case CustomExceptionCode.NOT_FOUND:
          code = 404;
          break;
      }
    }
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      code,
    });
  }
}
