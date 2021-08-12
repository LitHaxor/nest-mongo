import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { LoginDto, RegisterDto } from "../dtos/AuthUser.dto";
import { User } from "../models/user.schema";
import bcrypt from "bcryptjs";
@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    private santitizeUser({ username, seller, id, created, __v }: User) {
        return { username, seller, id, created, __v };
    }

    async getAllUser() {
        const user = await this.userModel.find();
        return user.map((e) => this.santitizeUser(e));
    }

    async getOneUser(_id: Types.ObjectId) {
        return (await this.userModel.findById(_id)).depopulate("password");
    }

    async createUser(createUserDto: RegisterDto) {
        const { username } = createUserDto;
        const user = await this.userModel.findOne({ username: username });
        if (user) {
            throw new HttpException(
                "User Already Exists!",
                HttpStatus.BAD_REQUEST,
            );
        }

        const createdUser = new this.userModel(createUserDto);
        await createdUser.save();
        return this.santitizeUser(createdUser);
    }

    async findByLogin(loginUserDto: LoginDto) {
        const { username, password } = loginUserDto;
        const user = await this.userModel.findOne({ username });
        if (!user) {
            throw new HttpException("User not found!", HttpStatus.UNAUTHORIZED);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.santitizeUser(user);
        } else {
            throw new HttpException(
                "Invalid credential",
                HttpStatus.UNAUTHORIZED,
            );
        }
    }

    async findByPayload(payload: any) {
        try {
            const { username } = payload;
            return await this.userModel.findOne({ username });
        } catch (error) {
            throw new HttpException("Wrong token!", HttpStatus.FORBIDDEN);
        }
    }
}
