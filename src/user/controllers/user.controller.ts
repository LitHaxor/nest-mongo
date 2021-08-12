import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Types } from "mongoose";
import { LoginDto, RegisterDto } from "../dtos/AuthUser.dto";
import { AuthService } from "../services/auth.service";
import { UserService } from "../services/user.service";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Get()
    @UseGuards(AuthGuard("jwt"))
    getAllUser() {
        return this.userService.getAllUser();
    }
    @Get(":id")
    getOneUser(@Param("id") _id: Types.ObjectId) {
        return this.userService.getOneUser(_id);
    }

    @Post("/login")
    async loginUser(@Body() loginUserDto: LoginDto) {
        const user = await this.authService.loginUser(loginUserDto);
        const payload = {
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
