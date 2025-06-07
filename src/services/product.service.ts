import { Request, Response } from "express";
import productModel from "../models/product.model";
import { isValidObjectId } from "mongoose";
import { deleteFromCloudinary } from "../config/cloudinary.config";

type RegexType = {
  $regex: string;
  $options: string;
};

type FilterType = {
  $or: (
    | { title: { $regex: string; $options: string }; description?: undefined }
    | { description: { $regex: string; $options: string }; title?: undefined }
  )[];
  category?: RegexType;
  title?: RegexType;
};

type SortType = {
  price?: 1 | -1;
};

export async function getAllProducts(req: Request, res: Response) {
  const { category, price, page, limit, search } = req.query;

  const filter: FilterType = {
    $or: [],
  };
  const sort: SortType = {};

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
  } else if (price === "asc") {
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
  const result = await productModel
    .find(filter)
    .sort(sort)
    .limit(limitNum)
    .skip(skip);

  res.json(result);
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

export async function addReview(req: Request, res: Response) {
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
