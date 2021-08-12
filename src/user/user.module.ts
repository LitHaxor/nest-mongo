import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserController } from "./controllers/user.controller";
import { User, UserSchema } from "./models/user.schema";
import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import bcrypt from "bcryptjs";
@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: () => {
                    const schema = UserSchema;
                    schema.pre(
                        "save",
                        async function (next: mongoose.HookNextFunction) {
                            try {
                                if (!this.isModified("password")) {
                                    return next();
                                }
                                const hashed = await bcrypt.hash(
                                    this["password"],
                                    10,
                                );
                                this["password"] = hashed;
                                return next();
                            } catch (error) {
                                return next();
                            }
                        },
                    );
                    return schema;
                },
            },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService, AuthService],
})
export class UserModule {}
