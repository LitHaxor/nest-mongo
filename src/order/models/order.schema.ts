import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { User } from "src/user/models/user.schema";

export type OrderDocument = Order & Document;

@Schema()
export class Order {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    })
    owner: User;

    @Prop()
    subTotal: number;

    @Prop()
    vat: number;

    @Prop()
    total: number;

    @Prop()
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId;
                ref: "Product";
            };
            quantity: {
                type: Number;
                default: 0;
            };
        },
    ];
}


export const OrderSchema = new mongoose.Schema(Order);
