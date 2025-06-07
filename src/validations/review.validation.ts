import Joi from "joi";

const reviewSchema = Joi.object({
  comment: Joi.string().min(6).max(200).required().messages({
    "string.base": "მხოლოდ სტრინგს ველოდები",
    "string.min": "მინიმუმია 6",
    "string.max": "მაქსიმუმი 200",
    "any.required": "კომენტარი აუცილებელია",
  }),
  rating: Joi.number().min(1).max(10).required().messages({
    "number.base": "მხოლოდ რიცხვს ველოდები",
    "number.min": "მინიმუმი რეიტინგია 1",
    "number.max": "მაქსიმუმი რეიტინგია 10",
    "any.required": "რეიტინგი აუცილებელია",
  }),
});

export default reviewSchema;
