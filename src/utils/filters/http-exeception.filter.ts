import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from "@nestjs/common";
import { FastifyRequest, FastifyReply } from "fastify";
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();
        const status = exception.getStatus
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        let message: any;
        try {
            message = exception?.getResponse() ? exception.getResponse() : null;
        } catch (error) {}
        const errorResponse = {
            code: status,
            timeStamp: new Date().toLocaleString(),
            path: request.url,
            method: request.method,
            message:
                status !== HttpStatus.INTERNAL_SERVER_ERROR
                    ? message.message
                        ? message.message
                        : exception.message || null
                    : "Something went wrong",
        };
        Logger.error(JSON.stringify(errorResponse), "HTTP ERROR");
        return response.status(status).send(errorResponse);
    }
}
