import { Request, Response } from "express";
import productModel from "../models/product.model";
import { isValidObjectId } from "mongoose";
import { deleteFromCloudinary } from "../config/cloudinary.config";

export async function getAllProducts(req: Request, res: Response) {
  const products = await productModel.find();
  res.json(products);
}

export async function addProduct(req: Request, res: Response) {
  const { title, description, category, price } = req.body;
  if (!req.file) {
    res.status(400).json({ error: "Image is required" });
    return;
  }

  const image = req.file?.path;
  const newProduct = await productModel.create({
    title,
    description,
    category,
    price,
    image,
  });
  res.status(201).json({ message: "created successfully", data: newProduct });
}

export async function getById(req: Request, res: Response) {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: "wrong id is provided" });
    return;
  }

  const product = await productModel.findById(id);
  if (!product) {
    res.status(404).json({ error: "product not found" });
    return;
  }

  res.json(product);
}

export async function deleteProduct(req: Request, res: Response) {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: "wrong id is provided" });
    return;
  }

  const deletedProduct = await productModel.findByIdAndDelete(id);

  if (!deletedProduct) {
    res.status(404).json({ error: "product not found" });
    return;
  }
  const imageUrl = deletedProduct.image;
  const fileName = imageUrl.split("uploads/")[1];
  const fileId = fileName.split(".")[0];
  const publicFileId = `uploads/${fileId}`;
  await deleteFromCloudinary(publicFileId);
  const publicId = imageUrl
    .split("/upload/")[1]
    .split("/")
    .slice(1)
    .join("/")
    .replace(/\.[^/.]+$/, "");

  await deleteFromCloudinary(publicId);

  await deleteFromCloudinary(imageUrl);

  res.json({ message: "deleted successfully", data: deletedProduct });
}

export async function updateProduct(req: Request, res: Response) {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ error: "wrong id is provided" });
    return;
  }

  const { title, description, category, price } = req.body;
  const updatedProduct = await productModel.findByIdAndUpdate(id, {
    title,
    description,
    category,
    price,
  });

  const newImage = req.file?.path;
  if (newImage) {
    const imageUrl = updatedProduct?.image;
    const fileName = imageUrl?.split("uploads/")[1];
    const fileId = fileName?.split(".")[0];
    const publicFileId = `uploads/${fileId}`;
    await deleteFromCloudinary(publicFileId);
  }
  if (!updatedProduct) {
    res.status(404).json({ error: "product not found" });
    return;
  }

  res.json({ message: "updated successfully" });
}
