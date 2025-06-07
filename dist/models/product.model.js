"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    reviews: [
        {
            email: { type: String, required: true },
            comment: { type: String, required: true },
            rating: { type: Number, required: true },
        },
        { timestamps: true },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("Product", productSchema);
