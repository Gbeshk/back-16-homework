"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productUpdateSchema = exports.productSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const productSchema = joi_1.default.object({
    title: joi_1.default.string().min(6).max(20).required().messages({
        "string.base": "მხოლოდ სტრინგს ველოდები",
        "string.min": "მინიმუმია 6",
        "string.max": "მაქსიმუმი 20",
        "any.required": "სახელი აუცილებელია",
    }),
    description: joi_1.default.string().min(6).max(200).required().messages({
        "string.base": "მხოლოდ სტრინგს ველოდები",
        "string.min": "მინიმუმია 6",
        "string.max": "მაქსიმუმი 200",
        "any.required": "აღწერა აუცილებელია",
    }),
    price: joi_1.default.number().required().messages({
        "number.base": "მხოლოდ რიცხვს ველოდები",
        "any.required": "ფასი აუცილებელია",
    }),
    category: joi_1.default.string().required().messages({
        "string.base": "მხოლოდ სტრინგს ველოდები",
        "any.required": "კატეგორია აუცილებელია",
    }),
});
exports.productSchema = productSchema;
const productUpdateSchema = joi_1.default.object({
    title: joi_1.default.string().min(6).max(20).optional().messages({
        "string.base": "მხოლოდ სტრინგს ველოდები",
        "string.min": "მინიმუმია 6",
        "string.max": "მაქსიმუმი 20",
    }),
    description: joi_1.default.string().min(6).max(200).optional().messages({
        "string.base": "მხოლოდ სტრინგს ველოდები",
        "string.min": "მინიმუმია 6",
        "string.max": "მაქსიმუმი 200",
    }),
    price: joi_1.default.number().optional().messages({
        "number.base": "მხოლოდ რიცხვს ველოდები",
    }),
    category: joi_1.default.string().optional().messages({
        "string.base": "მხოლოდ სტრინგს ველოდები",
    }),
});
exports.productUpdateSchema = productUpdateSchema;
exports.default = productSchema;
