import { Request, Response, Router } from "express";
import validateMiddleware from "../middlewares/validate.middleware";
import {
  productSchema,
  productUpdateSchema,
} from "../validations/product.validation";
import isAdminMiddleware from "../middlewares/isAdmin.middleware";
import {
  getAllProducts,
  addProduct,
  getById,
  updateProduct,
  deleteProduct,
} from "../services/product.service";
import { upload } from "../config/cloudinary.config";
import hasEmalMiddleware from "../middlewares/hasEmal.middleware";
import reviewSchema from "../validations/review.validation";
import productModel from "../models/product.model";

const productRouter = Router();

productRouter.post(
  "/:id/review",
  hasEmalMiddleware,
  validateMiddleware(reviewSchema),
  async (req: Request, res: Response) => {
    const { comment, rating } = req.body;
    const email = req.headers["email"] as string;
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      res.status(404).json({ error: "პროდუქტი ვერ მოიძებნა" });
      return;
    }

    const newReview = { comment, email, rating };

    product.reviews.push(newReview);

    await product.save();

    res.status(200).json({ message: "მიმოხილვა დაემატა წარმატებით", product });
  }
);

productRouter.get("/", getAllProducts);

productRouter.post(
  "/",
  upload.single("image"),
  validateMiddleware(productSchema),
  addProduct
);

productRouter.get("/:id", getById);

productRouter.delete("/:id", isAdminMiddleware, deleteProduct);

productRouter.put(
  "/:id",
  upload.single("image"),

  validateMiddleware(productUpdateSchema),
  isAdminMiddleware,
  updateProduct
);

export default productRouter;
