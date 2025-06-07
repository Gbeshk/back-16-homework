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
exports.getAllProducts = getAllProducts;
exports.addProduct = addProduct;
exports.getById = getById;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
exports.addReview = addReview;
const product_model_1 = __importDefault(require("../models/product.model"));
const mongoose_1 = require("mongoose");
const cloudinary_config_1 = require("../config/cloudinary.config");
function getAllProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { category, price, page, limit, search } = req.query;
        const filter = {
            $or: [],
        };
        const sort = {};
        if (typeof category === "string") {
            filter.category = { $regex: category, $options: "i" };
        }
        if (typeof search === "string") {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }
        if (price === "desc") {
            sort.price = -1;
        }
        else if (price === "asc") {
            sort.price = 1;
        }
        let limitNum = 30;
        if (limit) {
            limitNum = Number(limit);
        }
        let skip = 0;
        if (page) {
            skip = (Number(page) - 1) * limitNum;
        }
        const result = yield product_model_1.default
            .find(filter)
            .sort(sort)
            .limit(limitNum)
            .skip(skip);
        res.json(result);
    });
}
function addProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { title, description, category, price } = req.body;
        if (!req.file) {
            res.status(400).json({ error: "Image is required" });
            return;
        }
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        const newProduct = yield product_model_1.default.create({
            title,
            description,
            category,
            price,
            image,
        });
        res.status(201).json({ message: "created successfully", data: newProduct });
    });
}
function getById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            res.status(400).json({ error: "wrong id is provided" });
            return;
        }
        const product = yield product_model_1.default.findById(id);
        if (!product) {
            res.status(404).json({ error: "product not found" });
            return;
        }
        res.json(product);
    });
}
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            res.status(400).json({ error: "wrong id is provided" });
            return;
        }
        const deletedProduct = yield product_model_1.default.findByIdAndDelete(id);
        if (!deletedProduct) {
            res.status(404).json({ error: "product not found" });
            return;
        }
        const imageUrl = deletedProduct.image;
        const fileName = imageUrl.split("uploads/")[1];
        const fileId = fileName.split(".")[0];
        const publicFileId = `uploads/${fileId}`;
        yield (0, cloudinary_config_1.deleteFromCloudinary)(publicFileId);
        const publicId = imageUrl
            .split("/upload/")[1]
            .split("/")
            .slice(1)
            .join("/")
            .replace(/\.[^/.]+$/, "");
        yield (0, cloudinary_config_1.deleteFromCloudinary)(publicId);
        yield (0, cloudinary_config_1.deleteFromCloudinary)(imageUrl);
        res.json({ message: "deleted successfully", data: deletedProduct });
    });
}
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            res.status(400).json({ error: "wrong id is provided" });
            return;
        }
        const { title, description, category, price } = req.body;
        const updatedProduct = yield product_model_1.default.findByIdAndUpdate(id, {
            title,
            description,
            category,
            price,
        });
        const newImage = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (newImage) {
            const imageUrl = updatedProduct === null || updatedProduct === void 0 ? void 0 : updatedProduct.image;
            const fileName = imageUrl === null || imageUrl === void 0 ? void 0 : imageUrl.split("uploads/")[1];
            const fileId = fileName === null || fileName === void 0 ? void 0 : fileName.split(".")[0];
            const publicFileId = `uploads/${fileId}`;
            yield (0, cloudinary_config_1.deleteFromCloudinary)(publicFileId);
        }
        if (!updatedProduct) {
            res.status(404).json({ error: "product not found" });
            return;
        }
        res.json({ message: "updated successfully" });
    });
}
function addReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { comment, rating } = req.body;
        const email = req.headers["email"];
        const { id } = req.params;
        const product = yield product_model_1.default.findById(id);
        if (!product) {
            res.status(404).json({ error: "product not found" });
            return;
        }
        const newReview = { comment, email, rating };
        product.reviews.push(newReview);
        yield product.save();
        res.status(200).json({ message: "review added", product });
    });
}
