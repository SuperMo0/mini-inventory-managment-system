import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { StatusCodes } from "http-status-codes";
import { logStockChange } from './../lib/logger'

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

export async function getAllWh(req: Request, res: Response) {

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

export async function createNewWh(req: Request<{}, any, NewWareHouse>, res: Response) {

    const { description, location, title } = req.body || {}

    if (!(description && location && title)) {
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    let newWarehouse: WareHouse = await prisma.warehouses.create({
        data: {
            description,
            location,
            title
        }
    })

    let updatedNewWarehouse = {
        ...newWarehouse,
        total_items: 0,
        total_unique: 0
    }
    res.status(StatusCodes.CREATED).json({
        warehouse: updatedNewWarehouse
    })
}

export async function updateWhData(req: Request<{ whId: string }, any, UpdateWareHouse>, res: Response) {
    // this endpoint is still not used in the app 
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
        warehouse: updatedWareHouse
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
export async function addNewWhProduct(req: Request<{ whId: string }, any, NewWhProduct>, res: Response) {

    const { whId } = req.params

    let { productId, quantity } = req.body || {};

    if (!productId || quantity === undefined || quantity === null) {       // or maybe it's negative! we should use zod or express validator
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    quantity = Number(quantity)

    let whProduct = await prisma.warehouse_product.create({
        data: {
            product_id: productId,
            quantity: quantity,
            warehouse_id: whId
        },
        include: {
            product: true,
            warehouse: true,
        }
    })

    res.status(StatusCodes.CREATED).json({
        warehouseProduct: whProduct
    })

    //  better use transtion to be sure that the event is logged or the whole operation fail
    logStockChange('update', {
        source_warehouse_title: whProduct.warehouse.title,
        quantity: quantity,
        product_title: whProduct.product.title
    })

}

export async function updateWhProduct(req: Request<{ whId: string }, any, PatchWhProduct>, res: Response) {

    const { whId } = req.params
    let { quantity, productId } = req.body || {}

    quantity = Number(quantity)
    if (!quantity || isNaN(quantity) || !productId) {   // again we can use zod to make our life easier or express validator
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
        },
        include: {
            warehouse: true,
            product: true
        }
    })

    res.json({
        warehouseProduct: updatedWhProduct
    })

    logStockChange('update', {
        source_warehouse_title: updatedWhProduct.warehouse.title,
        quantity: quantity,
        product_title: updatedWhProduct.product.title
    })

}

export async function transferWhProduct(req: Request<{ whId: string }, any, TransferWhProduct>, res: Response) {

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
            },
            include: {
                product: true,
                warehouse: true
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
            },
            include: {
                product: true,
                warehouse: true,
            }
        })
    ])

    res.json({
        sourceWhProduct,
        destinationWhProduct
    })

    logStockChange('transfer', {
        source_warehouse_title: sourceWhProduct.warehouse.title,
        quantity: quantity,
        product_title: sourceWhProduct.product.title,
        destination_warehouse_title: destinationWhProduct.warehouse.title
    })

}


// we can add a flag to only send products ids if the client already fetched the products.
export async function getWhProducts(req: Request<{ whId: string }, any, any>, res: Response) {
    const { whId } = req.params

    let whProducts = await prisma.warehouse_product.findMany({
        where: {
            warehouse_id: whId
        },
        include: {
            product: true
        }
    })

    res.json({ warehouseProducts: whProducts })
}



export async function deleteWhProducts(req: Request<{ whId: string }, any, DeleteWhProduct>, res: Response) {

    const { productId } = req.body || {}

    const { whId } = req.params

    let response = await prisma.warehouse_product.delete({
        where: {
            warehouse_id_product_id: {
                product_id: productId,
                warehouse_id: whId
            }
        },
        include: {
            product: true,
            warehouse: true
        }
    })

    res.end()

    logStockChange('remove', {
        source_warehouse_title: response.warehouse.title,
        quantity: response.quantity,
        product_title: response.product.title
    })
}