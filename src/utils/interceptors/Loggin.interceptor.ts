import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
@Injectable()
export class LogginInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const now = Date.now();

        const { method, url } = req;

        return next
            .handle()
            .pipe(
                tap(() =>
                    Logger.log(
                        `${method} ${url} +${Date.now() - now}ms`,
                        context.getClass().name,
                    ),
                ),
            );
    }
}
