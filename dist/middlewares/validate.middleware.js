"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (schema) => {
    return (req, res, next) => {
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
