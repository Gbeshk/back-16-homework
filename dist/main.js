"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const connectToDb_1 = __importDefault(require("./config/connectToDb"));
const product_route_1 = __importDefault(require("./routes/product.route"));
(0, connectToDb_1.default)();
app.use(express_1.default.json());
app.use("/products", product_route_1.default);
app.listen(4000, () => {
    console.log("running on http://localhost:4000");
});
