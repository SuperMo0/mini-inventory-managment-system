import { Router } from "express"
import * as controller from '../controllers/wh.js'


let router = Router()

//warehouse controllers
router.get('/', controller.get_all_wh)

router.post('/', controller.create_new_wh)

router.put('/:whId', controller.update_wh_data)


// warehouse/products controllers
router.post('/:whId/products', controller.create_new_wh_product);

router.put('/:whId/products', controller.create_new_wh_product);

router.put('/:whId/products/:whId', controller.transfer_wh_product);

router.delete('/:whId/products/:productId', controller.create_new_wh_product);

router.get('/:whId/products', controller.create_new_wh_product);








export default router