import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const email = req.headers["email"];

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "იმეილი აუცილებელია" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "გთხოვთ, შეიყვანეთ ვალიდური იმეილი" });
    return;
  }

  next();
};
