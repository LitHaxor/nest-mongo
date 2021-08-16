import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Types } from "mongoose";
import { ApiTags, ApiBearerAuth, ApiSecurity } from "@nestjs/swagger";
import { IUserInfo, UserInfo } from "src/user/decorator/user.decorator";
import { SellerGurd } from "src/user/gurds/seller.guard";
import { User } from "src/user/models/user.schema";
import { CreateProductDto } from "../dtos/createProduct.dto";
import { UpdateProductDto } from "../dtos/updateProduct.dto";
import { ProductServices } from "../services/product.service";

@ApiBearerAuth()
@ApiTags("Product")
@Controller({
    version: "1",
    path: "product",
})
export class ProductController {
    constructor(private productService: ProductServices) {}

    @Get()
    listAllProducts() {
        return this.productService.listAllProducts();
    }

    @Get(":id")
    listOneProduct(@Param("id") _id: string) {
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
    updateProduct(
        @Body() updateProduct: UpdateProductDto,
        @Param("id") _id: string,
        @UserInfo() user: User,
    ) {
        return this.productService.updateOneProduct(_id, updateProduct, user);
    }

    @Delete(":id")
    deleteOneProduct(@Param("id") _id: string) {
        return this.productService.deleteOneProduct(_id);
    }
}
