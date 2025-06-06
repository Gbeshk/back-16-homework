"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validate_middleware_1 = __importDefault(require("../middlewares/validate.middleware"));
const product_validation_1 = __importStar(require("../validations/product.validation"));
const isAdmin_middleware_1 = __importDefault(require("../middlewares/isAdmin.middleware"));
const product_service_1 = require("../services/product.service");
const cloudinary_config_1 = require("../config/cloudinary.config");
const productRouter = (0, express_1.Router)();
productRouter.get("/", product_service_1.getAllProducts);
productRouter.post("/", cloudinary_config_1.upload.single("image"), (0, validate_middleware_1.default)(product_validation_1.default), product_service_1.addProduct);
productRouter.get("/:id", product_service_1.getById);
productRouter.delete("/:id", isAdmin_middleware_1.default, product_service_1.deleteProduct);
productRouter.put("/:id", cloudinary_config_1.upload.single("image"), (0, validate_middleware_1.default)(product_validation_1.productUpdateSchema), isAdmin_middleware_1.default, product_service_1.updateProduct);
exports.default = productRouter;
