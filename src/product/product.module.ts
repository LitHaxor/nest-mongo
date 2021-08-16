import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
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
        UserModule,
    ],
    controllers: [ProductController],
    providers: [ProductServices],
})
export class ProductModule {}
