import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { StatusCodes } from "http-status-codes";

type WareHouse = {
    id: string,
    location: string,
    description: string,
    title: string
}

type NewWareHouse = Omit<WareHouse, 'id' | 'created_at'>;

type UpdateWareHouse = Partial<NewWareHouse>

export async function get_all_wh(req: Request, res: Response) {

    // to be tested 
    let warehouses: WareHouse[] = await prisma.$queryRaw`
    select
        id,location, description, title, total_items, total_unique
    from warehouses
    left join(
    select
        warehouse_id,
        count(*) as total_unique,
        sum(quantity) as total_items
    from warehouse_product group by warehouse_id
    ) as t 
    on t.warehouse_id = warehouses.id   
    `
    console.log(warehouses);
}

export async function create_new_wh(req: Request<{}, any, NewWareHouse>, res: Response) {

    const { description, location, title } = req.body || {}

    if (!(description && location && title)) {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    let newWareHouse: WareHouse = await prisma.warehouses.create({
        data: {
            description,
            location,
            title
        }
    })

    res.status(StatusCodes.CREATED).json({
        wareHouse: newWareHouse
    })
}

export async function update_wh_data(req: Request<{ whId: string }, any, UpdateWareHouse>, res: Response) {

    const { location, description } = req.body

    const whId = req.params.whId

    if (!whId) {
        return res.status(StatusCodes.BAD_REQUEST).end()
    }

    let updatedWareHouse = await prisma.warehouses.update({
        data: {
            location,
            description,
        },
        where: {
            id: whId
        }
    })
    if (!updatedWareHouse) { return res.status(StatusCodes.BAD_REQUEST).end() }

    return res.json({
        wareHouse: updatedWareHouse
    })
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