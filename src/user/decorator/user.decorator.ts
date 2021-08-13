import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserInfo = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user = request.user;
        if (user) {
            const { username, _id, seller, created } = user;
            return { username, _id, seller, created };
        } else return null;
    },
);
