import type { Request, Response, NextFunction } from "express";

export async function error_handler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500);
    let stack = err.stack;
    let message = process.env.NODE_ENV == "development" ? stack : null;
    res.end(message);
}