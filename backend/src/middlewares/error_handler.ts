import type { Request, Response, NextFunction } from "express";
import { Prisma } from "../../generated/prisma/client";
import { StatusCodes } from "http-status-codes";

export async function error_handler(err: Error, req: Request, res: Response, next: NextFunction) {


    let stack = err.stack;

    let message = process.env.NODE_ENV == "development" ? stack : null;

    // todo: we should check if error is prisma 'row not found' error and return not found instead
    if (err.name === 'DriverAdapterError' || err instanceof Prisma.PrismaClientValidationError || err instanceof Prisma.PrismaClientKnownRequestError) {
        console.log(err);

        return res.status(StatusCodes.BAD_REQUEST).json({ message });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message });
}