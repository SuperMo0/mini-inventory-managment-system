import { Router } from "express"
import * as controller from '../controllers/products.js'
import { validateParamId } from "../middlewares/warehouse_id.js"


let router = Router()
router.param('productId', validateParamId('productId'))

router.get('/', controller.getAllProducts)

router.post('/', controller.createNewProduct)

router.patch('/:productId', controller.updateProductData)








export default router