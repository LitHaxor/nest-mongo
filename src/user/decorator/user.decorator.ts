import { createParamDecorator } from "@nestjs/common";

export const UserInfo = createParamDecorator((data, req) => req.user);
