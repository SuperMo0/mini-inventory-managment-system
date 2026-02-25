import type { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"

export async function validate_wh_id(req: Request, res: Response, next: NextFunction) {

    // just check if it's a uuid v4 or not ,
    // in case it doesn't exist the prisma update will be returing null 

    const { whId } = req.params
    if (!whId) {
        return res.status(StatusCodes.BAD_REQUEST).end()
    }

    next()
}