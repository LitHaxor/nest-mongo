import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from "mongoose";

class Address {
    address1: string;
    address2: string;
    city: string;
    state: string;
    phone: string;
    zip: number;
}

@Schema()
export class User extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: Boolean, default: false })
    seller: boolean;

    @Prop({ type: Address })
    address: Address;

    @Prop({ type: Date, default: Date.now() })
    created: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
