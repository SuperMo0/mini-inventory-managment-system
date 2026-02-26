import type { Request, Response, NextFunction } from "express"
import { StatusCodes } from "http-status-codes"

export function validate_param_id(param: string) {

    async function validate_id(req: Request, res: Response, next: NextFunction) {
        let v4 = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)
        const id = req.params[param]
        if (id instanceof Array || !v4.test(id)) {
            return res.status(StatusCodes.BAD_REQUEST).end()
        }
        next()
    }
    return validate_id;
}