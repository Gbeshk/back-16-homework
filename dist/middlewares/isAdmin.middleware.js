"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    const admin = req.headers["admin"];
    if (!admin) {
        res.status(400).json({ error: "you must be admin" });
        return;
    }
    next();
};
