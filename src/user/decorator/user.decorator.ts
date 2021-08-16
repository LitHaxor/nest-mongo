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
        const { username, created, seller, _id }: IUserInfo = request.user;
        if (request.user) {
            return { username, created, seller, _id };
        } else return null;
    },
);
