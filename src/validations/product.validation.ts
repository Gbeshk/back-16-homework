import Joi from "joi";

const productSchema = Joi.object({
  title: Joi.string().min(6).max(20).required().messages({
    "string.base": "მხოლოდ სტრინგს ველოდები",
    "string.min": "მინიმუმია 6",
    "string.max": "მაქსიმუმი 20",
    "any.required": "სახელი აუცილებელია",
  }),
  description: Joi.string().min(6).max(200).required().messages({
    "string.base": "მხოლოდ სტრინგს ველოდები",
    "string.min": "მინიმუმია 6",
    "string.max": "მაქსიმუმი 200",
    "any.required": "აღწერა აუცილებელია",
  }),
  price: Joi.number().required().messages({
    "number.base": "მხოლოდ რიცხვს ველოდები",
    "any.required": "ფასი აუცილებელია",
  }),
  category: Joi.string().required().messages({
    "string.base": "მხოლოდ სტრინგს ველოდები",
    "any.required": "კატეგორია აუცილებელია",
  }),
});

const productUpdateSchema = Joi.object({
  title: Joi.string().min(6).max(20).optional().messages({
    "string.base": "მხოლოდ სტრინგს ველოდები",
    "string.min": "მინიმუმია 6",
    "string.max": "მაქსიმუმი 20",
  }),
  description: Joi.string().min(6).max(200).optional().messages({
    "string.base": "მხოლოდ სტრინგს ველოდები",
    "string.min": "მინიმუმია 6",
    "string.max": "მაქსიმუმი 200",
  }),
  price: Joi.number().optional().messages({
    "number.base": "მხოლოდ რიცხვს ველოდები",
  }),
  category: Joi.string().optional().messages({
    "string.base": "მხოლოდ სტრინგს ველოდები",
  }),
});

export { productSchema, productUpdateSchema };
