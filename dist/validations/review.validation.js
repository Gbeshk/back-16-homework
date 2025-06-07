"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const reviewSchema = joi_1.default.object({
    comment: joi_1.default.string().min(6).max(200).required().messages({
        "string.base": "მხოლოდ სტრინგს ველოდები",
        "string.min": "მინიმუმია 6",
        "string.max": "მაქსიმუმი 200",
        "any.required": "კომენტარი აუცილებელია",
    }),
    rating: joi_1.default.number().min(1).max(10).required().messages({
        "number.base": "მხოლოდ რიცხვს ველოდები",
        "number.min": "მინიმუმი რეიტინგია 1",
        "number.max": "მაქსიმუმი რეიტინგია 10",
        "any.required": "რეიტინგი აუცილებელია",
    }),
});
exports.default = reviewSchema;
