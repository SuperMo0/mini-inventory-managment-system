import { Router, type RequestParamHandler } from "express"
import * as controller from '../controllers/wh.js'
import { validate_param_id } from "../middlewares/warehouse_id.js"


const router = Router()

router.param('whId', validate_param_id('whId'))

//warehouse controllers
router.get('/', controller.get_all_wh)

router.post('/', controller.create_new_wh)

router.patch('/:whId', controller.update_wh_data)

// warehouse/products controllers
router.get('/:whId/products', controller.get_wh_products);

router.post('/:whId/products', controller.add_new_wh_product);

router.post('/:whId/products/transfer', controller.transfer_wh_product);

router.patch('/:whId/products', controller.update_wh_product);

router.delete('/:whId/products', controller.delete_wh_products);




export default router