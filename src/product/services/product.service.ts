import {
    HttpException,
    HttpStatus,
    Injectable,
    Logger,
    UseGuards,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { IUserInfo } from "src/user/decorator/user.decorator";
import { User } from "src/user/models/user.schema";
import { CreateProductDto } from "../dtos/createProduct.dto";
import { UpdateProductDto } from "../dtos/updateProduct.dto";
import { Product } from "../models/product.schema";

@Injectable()
export class ProductServices {
    constructor(
        @InjectModel("Product") private readonly productModel: Model<Product>,
    ) {}

    async listAllProducts() {
        return await this.productModel.find().populate("owner", "-password");
    }

    async listOneProduct(_id: string) {
        return await this.productModel
            .findById(_id)
            .populate("owner", "-password");
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
            return product.populate("owner", "-password");
        } catch (error) {
            console.log(error);
        }
    }

    async updateOneProduct(
        _id: string,
        updateProductDto: UpdateProductDto,
        userInfo: User,
    ) {
        const productToFind = await this.productModel.findOne({
            owner: userInfo,
            _id: _id,
        });
        if (!productToFind)
            throw new HttpException("Product Not found", HttpStatus.NOT_FOUND);
        return await this.productModel.findOneAndUpdate(
            { _id: productToFind._id },
            updateProductDto,
            {
                returnDocument: "after",
            },
        );
    }
    async deleteOneProduct(_id: string) {
        return await this.productModel.findByIdAndDelete(_id);
    }
}
