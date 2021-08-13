import { Injectable, UseGuards } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { IUserInfo } from "src/user/decorator/user.decorator";
import { User } from "src/user/models/user.schema";
import { UserService } from "src/user/services/user.service";
import { CreateProductDto } from "../dtos/createProduct.dto";
import { UpdateProductDto } from "../dtos/updateProduct.dto";
import { Product } from "../models/product.schema";

@Injectable()
export class ProductServices {
    constructor(
        @InjectModel("Product") private readonly productModel: Model<Product>,
    ) {}

    async listAllProducts() {
        return await this.productModel.find().populate("owner");
    }

    async listOneProduct(_id: Types.ObjectId) {
        return await this.productModel.findById(_id).populate("owner");
    }

    async createProduct(
        createProductDto: CreateProductDto,
        userInfo: IUserInfo,
    ) {
        try {
            const product = await this.productModel.create({
                ...createProductDto,
                owner: userInfo,
            });
            await product.save();
            return product;
        } catch (error) {
            console.log(error);
        }
    }

    async updateOneProduct(
        _id: Types.ObjectId,
        updateProductDto: UpdateProductDto,
        userInfo: User,
    ) {
        return await this.productModel.findOneAndUpdate(
            {
                owner: userInfo,
                _id: _id,
            },
            updateProductDto,
        );
    }
    async deleteOneProduct(_id: Types.ObjectId) {
        return await this.productModel.findOneAndDelete(_id);
    }
}
