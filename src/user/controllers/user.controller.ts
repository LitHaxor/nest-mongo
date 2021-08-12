import { Body, Controller, Get, Param, Post } from "@nestjs/common";
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
    getAllUser() {
        return this.userService.getAllUser();
    }
    @Get(":id")
    getOneUser(@Param("id") _id: Types.ObjectId) {
        return this.userService.getOneUser(_id);
    }

    @Post("/login")
    loginUser(@Body() loginUserDto: LoginDto) {
        return this.authService.loginUser(loginUserDto);
    }

    @Post("/register")
    registerUser(@Body() registerDto: RegisterDto) {
        return this.authService.registerUser(registerDto);
    }
}
