import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export default (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body || {}, {
      abortEarly: false,
    });

    if (error) {
      res.status(400).json({
        error: error.details.map((er) => er.message),
      });
      return;
    }

    req.body = value;
    next();
  };
};
