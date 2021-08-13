import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/models/user.schema";
import { UserService } from "src/user/services/user.service";
import { UserModule } from "src/user/user.module";
import { ProductController } from "./controller/product.controller";
import { Product, productSchema } from "./models/product.schema";
import { ProductServices } from "./services/product.service";

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Product.name,
                schema: productSchema,
            },
        ]),
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
        ]),
        UserModule,
    ],
    controllers: [ProductController],
    providers: [ProductServices],
})
export class ProductModule {}
