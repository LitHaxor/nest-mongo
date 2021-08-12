import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from "@nestjs/common";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const errorResponse = {
            code: status,
            timeStamp: new Date().toString(),
            path: request.url,
            method: request.method,
            message:
                status !== HttpStatus.INTERNAL_SERVER_ERROR
                    ? exception.message || null
                    : "Something went wrong",
        };

        return response.status(status).json(errorResponse);
    }
}
