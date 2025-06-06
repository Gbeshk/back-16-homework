import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const admin = req.headers["admin"];

  if (!admin) {
    res.status(400).json({ error: "you must be admin" });
    return;
  }
  next();
};
