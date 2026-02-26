import { Router } from "express"
import * as controller from '../controllers/products.js'
import { validate_param_id } from "../middlewares/warehouse_id.js"


let router = Router()
router.param('productId', validate_param_id('productId'))

router.get('/', controller.get_all_products)

router.post('/', controller.create_new_product)

router.patch('/:productId', controller.update_product_data)








export default router