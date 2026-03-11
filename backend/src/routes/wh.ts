import { Router, type RequestParamHandler } from "express"
import * as controller from '../controllers/wh.js'
import { validateParamId } from "../middlewares/warehouse_id.js"


const router = Router()

router.param('whId', validateParamId('whId'))

//warehouse controllers
router.get('/', controller.getAllWh)

router.post('/', controller.createNewWh)

router.patch('/:whId', controller.updateWhData)

// warehouse/products controllers
router.get('/:whId/products', controller.getWhProducts);

router.post('/:whId/products', controller.addNewWhProduct);

router.post('/:whId/products/transfer', controller.transferWhProduct);

router.patch('/:whId/products', controller.updateWhProduct);

router.delete('/:whId/products', controller.deleteWhProducts);




export default router