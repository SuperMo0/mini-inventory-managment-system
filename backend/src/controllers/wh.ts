import type { Request, Response } from "express";

// warehouse operations
export function get_all_wh(req: Request, res: Response) {
    res.json({
        product: "product1, product2"
    })
}

export function create_new_wh(req: Request, res: Response) {
    res.status(201).send("Done");
}

export function update_wh_data(req: Request, res: Response) {
    res.status(201).send("Updated successfuly");
}

// warehouse/products routes
export function create_new_wh_product(req: Request, res: Response) {
    res.status(201).send("created Successfuly");
}

export function update_wh_product(req: Request, res: Response) {
    res.status(201).send("Updated prodcut inside wh Successfuly");
}

export function transfer_wh_product(req: Request, res: Response) {
    res.status(201).send("Updated prodcut inside wh Successfuly");
}


export function get_wh_products(req: Request, res: Response) {
    res.status(201).send("Updated prodcut inside wh Successfuly");
}