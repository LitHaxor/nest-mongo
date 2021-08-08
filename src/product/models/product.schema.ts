import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    title: String,
    description: String,
    image: String,
    price: String,
    created: {
        type: Date,
        default: Date.now,
    },
});
