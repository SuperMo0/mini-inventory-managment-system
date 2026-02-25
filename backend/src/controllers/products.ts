import type { Request, Response } from "express";

export function get_all_products(req: Request, res: Response) {
    res.json({
        product: "product1, product2"
    })
}

export function create_new_product(req: Request, res: Response) {
    res.status(201).send("Done");
}

export function update_product_data(req: Request, res: Response) {
    res.status(201).send("Updated successfuly");
}