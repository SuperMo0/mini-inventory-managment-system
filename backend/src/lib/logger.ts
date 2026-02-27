import { prisma } from "./../lib/prisma"
type Action = "remove" | "transfer" | "update"

type StockChangeData = {
    product_title: string
    source_warehouse_title: string
    destination_warehouse_title?: string
    quantity: number | string
}


export async function log_stock_change(action: Action, data: StockChangeData) {

    await prisma.stock_changes.create({
        data: {
            action,
            ...data,
            quantity: Number(data.quantity)
        }
    })

}
