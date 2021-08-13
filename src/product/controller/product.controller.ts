import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Types } from "mongoose";
import { IUserInfo, UserInfo } from "src/user/decorator/user.decorator";
import { SellerGurd } from "src/user/gurds/seller.guard";
import { User } from "src/user/models/user.schema";
import { CreateProductDto } from "../dtos/createProduct.dto";
import { UpdateProductDto } from "../dtos/updateProduct.dto";
import { ProductServices } from "../services/product.service";

@Controller("product")
export class ProductController {
    constructor(private productService: ProductServices) {}

    @Get()
    listAllProducts(@UserInfo() user: any) {
        return this.productService.listAllProducts();
    }

    @Get(":id")
    listOneProduct(@Param("id") _id: Types.ObjectId) {
        return this.productService.listOneProduct(_id);
    }

    @Post()
    @UseGuards(AuthGuard("jwt"), SellerGurd)
    createProduct(
        @Body() createProduct: CreateProductDto,
        @UserInfo() user: IUserInfo,
    ) {
        return this.productService.createProduct(createProduct, user);
    }

    @Put(":id")
    @UseGuards(AuthGuard("jwt"), SellerGurd)
    updateOneProduct(
        @Param("id") _id: Types.ObjectId,
        @Body() updateProductDto: UpdateProductDto,
        @UserInfo() user: User,
    ) {
        return this.productService.updateOneProduct(
            _id,
            updateProductDto,
            user,
        );
    }

    @Delete(":id")
    deleteOneProduct(@Param("id") _id: Types.ObjectId) {
        return this.productService.deleteOneProduct(_id);
    }
}
