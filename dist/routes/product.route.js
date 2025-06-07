"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const product_validation_1 = require("../validations/product.validation");
const isAdmin_middleware_1 = __importDefault(require("../middlewares/isAdmin.middleware"));
const product_service_1 = require("../services/product.service");
const cloudinary_config_1 = require("../config/cloudinary.config");
const hasEmal_middleware_1 = __importDefault(require("../middlewares/hasEmal.middleware"));
const review_validation_1 = __importDefault(require("../validations/review.validation"));
const product_model_1 = __importDefault(require("../models/product.model"));
const productRouter = (0, express_1.Router)();
productRouter.post("/:id/review", hasEmal_middleware_1.default, (0, validate_middleware_1.default)(review_validation_1.default), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { comment, rating } = req.body;
    const email = req.headers["email"];
    const { id } = req.params;
    const product = yield product_model_1.default.findById(id);
    if (!product) {
        res.status(404).json({ error: "პროდუქტი ვერ მოიძებნა" });
        return;
    }
    const newReview = { comment, email, rating };
    product.reviews.push(newReview);
    yield product.save();
    res.status(200).json({ message: "მიმოხილვა დაემატა წარმატებით", product });
}));
productRouter.get("/", product_service_1.getAllProducts);
productRouter.post("/", cloudinary_config_1.upload.single("image"), (0, validate_middleware_1.default)(product_validation_1.productSchema), product_service_1.addProduct);
productRouter.get("/:id", product_service_1.getById);
productRouter.delete("/:id", isAdmin_middleware_1.default, product_service_1.deleteProduct);
productRouter.put("/:id", cloudinary_config_1.upload.single("image"), (0, validate_middleware_1.default)(product_validation_1.productUpdateSchema), isAdmin_middleware_1.default, product_service_1.updateProduct);
exports.default = productRouter;
