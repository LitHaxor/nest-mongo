import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    seller: {
        type: Boolean,
        default: false,
    },
    address: {
        address1: String,
        address2: String,
        city: String,
        state: String,
        phone: String,
        zip: Number,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});
