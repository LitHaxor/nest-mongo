import { Injectable } from "@nestjs/common";
import { LoginDto, RegisterDto } from "../dtos/AuthUser.dto";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async loginUser(loginUser: LoginDto) {
        return await this.userService.findByLogin(loginUser);
    }

    async registerUser(registerUser: RegisterDto) {
        return await this.userService.createUser(registerUser);
    }
}
