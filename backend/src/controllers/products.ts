import type { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { prisma } from "../lib/prisma.js";

interface NewProduct {
    title: string
    description: string
}

interface UpdateProduct {
    title?: string
    description?: string
}

export async function get_all_products(req: Request, res: Response) {

    let products = await prisma.products.findMany({
        include: {
            warehouseProducts: {
                select: {
                    quantity: true
                }
            }
        }
    })
    /**
     * this is an O(N*M) operation where
     * N is the number of products
     * M is the number of warehouses that a product belong to
     * we can improve it by using a raw query instead 
     */
    let updatedProducts = products.map(product => {
        let total = product.warehouseProducts.reduce((sum, item) => sum + item.quantity, 0);
        const { warehouseProducts, ...productResult } = product
        return {
            ...productResult,
            total
        }
    })

    res.json({
        products: updatedProducts
    })
}

export async function create_new_product(req: Request<{}, any, NewProduct>, res: Response) {
    const { title, description } = req.body || {}

    if (!(title && description)) {
        return res.status(StatusCodes.BAD_REQUEST).end()
    }

    let product = await prisma.products.create({
        data: {
            title: title,
            description: description
        }
    })

    res.status(StatusCodes.CREATED).json({
        product
    })
}

export async function update_product_data(req: Request<{ productId: string }, any, UpdateProduct>, res: Response) {
    const { title, description } = req.body || {}

    const { productId } = req.params;

    if (!(title || description) || !productId) {
        return res.status(StatusCodes.BAD_REQUEST).end()
    }

    let updatedProduct = await prisma.products.update({
        data: {
            title: title,
            description: description
        },
        where: {
            id: productId
        }
    })

    res.json({
        product: updatedProduct
    })
}