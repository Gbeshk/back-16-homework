import { Router } from "express";
import validateMiddleware from "../middlewares/validate.middleware";
import productSchema, {
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

const productRouter = Router();

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
