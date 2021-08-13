import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Types } from "mongoose";
export interface IUserInfo {
    username: string;
    _id: Types.ObjectId;
    seller: Boolean;
    created: Date;
}

export const UserInfo = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const user: IUserInfo = request.user;
        if (user) {
            return user;
        } else return null;
    },
);
