import { default as mongoose } from "mongoose";
import reviewSchema from "./review.model";

const productSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
