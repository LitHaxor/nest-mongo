import { Document } from "mongoose";
import { Product } from "src/product/types/product.types";
import { User } from "src/user/types/user.types";

interface ProductOrder {
    product: Product;
    quantity: number;
}

export interface Order extends Document {
    owner: User;
    totalPrice: number;
    products: ProductOrder[];
    created: Date;
}
