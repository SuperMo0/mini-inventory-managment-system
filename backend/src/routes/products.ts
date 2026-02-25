import { Router } from "express"
import * as controller from '../controllers/products.js'


let router = Router()

let products = [{ name: "window", quantity: 22 }]

router.get('/', controller.get_all_products)

router.post('/', controller.create_new_product)

router.put('/:productId', controller.update_product_data)








export default router