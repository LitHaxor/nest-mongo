import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/models/user.schema";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
    owner: User;

    @Prop()
    title: string;

    @Prop([String])
    description: string[];

    @Prop()
    price: string;

    @Prop({ type: Date, default: Date.now })
    createdAt: Date;
}

export const productSchema = SchemaFactory.createForClass(Product);
