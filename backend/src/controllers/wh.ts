import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { StatusCodes } from "http-status-codes";

type WareHouse = {
    id: string,
    location: string,
    description: string,
    title: string
}
type WareHouseExtra = WareHouse & {
    total_items: number,
    total_unique: number
}

type NewWareHouse = Omit<WareHouse, 'id' | 'created_at'>;

type UpdateWareHouse = Partial<NewWareHouse>

export async function get_all_wh(req: Request, res: Response) {

    // faster instead of O(N*M)
    let warehouses: WareHouseExtra[] = await prisma.$queryRaw`
    select
        id,location, description, title, coalesce(t.total_items,0)::int as total_items, coalesce(t.total_unique,0)::int as total_unique
    from warehouses
    left join(
    select
        warehouse_id,
        sum(case when quantity > 0 then 1 else 0 end) as total_unique,
        sum(quantity) as total_items
    from warehouse_product group by warehouse_id
    ) as t 
    on t.warehouse_id = warehouses.id   
    `
    res.json({
        warehouses
    })
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

    const { location, description, title } = req.body

    const whId = req.params.whId

    let updatedWareHouse = await prisma.warehouses.update({
        data: {
            location,
            description,
            title
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








type NewWhProduct = {
    productId: string,
    quantity: string | number
}

type PatchWhProduct = NewWhProduct

type TransferWhProduct = NewWhProduct & {
    destinationId: string
}

type DeleteWhProduct = Pick<NewWhProduct, 'productId'>

// warehouse/products routes
export async function add_new_wh_product(req: Request<{ whId: string }, any, NewWhProduct>, res: Response) {

    const { whId } = req.params

    const { productId, quantity = 0 } = req.body || {};

    if (!(productId && quantity)) {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    let whProduct = await prisma.warehouse_product.create({
        data: {
            product_id: productId,
            quantity: Number(quantity),
            warehouse_id: whId
        }
    })

    res.status(StatusCodes.CREATED).json({
        whProduct
    })

    req.log.info({ data: { productId, quantity, warehouseId: whId } }, "action:add_warehouse_stock")
}

export async function update_wh_product(req: Request<{ whId: string }, any, PatchWhProduct>, res: Response) {

    const { whId } = req.params
    let { quantity, productId } = req.body

    quantity = Number(quantity)
    if (!quantity && isNaN(quantity)) {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    let updatedWhProduct = await prisma.warehouse_product.update({
        data: {
            quantity
        },
        where: {
            warehouse_id_product_id: {
                warehouse_id: whId,
                product_id: productId
            }
        }
    })

    res.json({
        whProduct: updatedWhProduct
    })

    req.log.info({ data: { quantity, productId, warehouseId: whId } }, "action:update_warehouse_stock")
}

export async function transfer_wh_product(req: Request<{ whId: string }, any, TransferWhProduct>, res: Response) {


    const { destinationId, productId, quantity } = req.body
    const { whId } = req.params

    if (!(destinationId && productId && quantity)) {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    const [sourceWhProduct, destinationWhProduct] = await prisma.$transaction([

        prisma.warehouse_product.update({
            data: {
                quantity: {
                    decrement: Number(quantity)
                }
            },
            where: {
                warehouse_id_product_id: {
                    product_id: productId,
                    warehouse_id: whId
                }
            }
        }),
        prisma.warehouse_product.upsert({
            update: {
                quantity: {
                    increment: Number(quantity)
                }
            },
            where: {
                warehouse_id_product_id: {
                    product_id: productId,
                    warehouse_id: destinationId
                }
            },
            create: {
                warehouse_id: destinationId,
                product_id: productId,
                quantity: Number(quantity)
            }
        })
    ])

    res.json({
        sourceWhProduct,
        destinationWhProduct
    })

    req.log.info({ data: { productId, quantity, warehouseId: whId, destinationId: destinationId } }, "action:transfer_warehouse_stock")
}

export async function get_wh_products(req: Request<{ whId: string }, any, any>, res: Response) {
    const { whId } = req.params

    let whProducts = await prisma.warehouse_product.findMany({
        where: {
            warehouse_id: whId
        },
        include: {
            product: true
        }
    })

    res.json(whProducts)
}



export async function delete_wh_products(req: Request<{ whId: string }, any, DeleteWhProduct>, res: Response) {

    const { productId } = req.body || {}

    const { whId } = req.params

    let response = await prisma.warehouse_product.delete({
        where: {
            warehouse_id_product_id: {
                product_id: productId,
                warehouse_id: whId
            }
        }
    })

    res.end()

    req.log.info({ data: { productId, warehouseId: whId } }, "action:delete_warehouse_stock")
}