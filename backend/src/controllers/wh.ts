import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";

type WareHouse = {
    id: string,
    location: string,
    description: string,
    created_at: Date
}

type NewWareHouse = Omit<WareHouse, 'id' | 'created_at'>;

export async function get_all_wh(req: Request, res: Response) {

    let warehouses: WareHouse[] = await prisma.$queryRaw`

    select * from warehouses
    left join (select warehouse_id,count(*) as total_unique,sum(quantity) as total) as t
    on t.warehouse_id = warehouses.id
    `
    console.log(warehouses);
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