import { HttpException, HttpStatus } from "@nestjs/common";
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class SellerGurd implements CanActivate {
    constructor() {}
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        if (request.user && request.user.seller) {
            const user = request.user;
            return user.seller;
        }
        throw new HttpException(
            "You don't have sufficient access!",
            HttpStatus.FORBIDDEN,
        );
    }
}
