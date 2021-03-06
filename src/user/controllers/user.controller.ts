import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Req,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags } from "@nestjs/swagger";
import { UserInfo } from "../decorator/user.decorator";
import { LoginDto, RegisterDto } from "../dtos/AuthUser.dto";
import { SellerGurd } from "../gurds/seller.guard";
import { Payload } from "../interfaces/payload";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@ApiTags("user")
@Controller({
    path: "user",
    version: "1",
})
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Get()
    @UseGuards(AuthGuard("jwt"), SellerGurd)
    getAllUser(@UserInfo() userInfo: any) {
        console.log(userInfo);
        return this.userService.getAllUser();
    }
    @Get(":id")
    getOneUser(@Param("id") _id: string) {
        return this.userService.getOneUser(_id);
    }

    @Post("/login")
    async loginUser(@Body() loginUserDto: LoginDto) {
        const user = await this.authService.loginUser(loginUserDto);
        const payload: Payload = {
            username: user.username,
            seller: user.seller,
        };

        const token = await this.authService.signPayload(payload);
        return { user, token };
    }

    @Post("/register")
    async registerUser(@Body() registerDto: RegisterDto) {
        const user = await this.userService.createUser(registerDto);
        const payload = {
            username: user.username,
            seller: user.seller,
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
}
