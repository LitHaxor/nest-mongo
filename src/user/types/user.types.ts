import { Document } from "mongoose";

interface Address {
    address1: string;
    address2: string;
    city: string;
    state: string;
    phone: string;
    zip: number;
}

export interface User extends Document {
    name: string;
    password: string;
    seller: boolean;
    address: Address;
    created: Date;
}
