import express from "express";
const app = express();
import connectToDb from "./config/connectToDb";
import productRouter from "./routes/product.route";
connectToDb();

app.use(express.json());
app.use("/products", productRouter);

app.listen(4000, () => {
  console.log("running on http://localhost:4000");
});
