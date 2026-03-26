import {Router} from "express"
import {checkIsAuth} from "../middlewares/checkIsAuth";
import ingredientController from "../controllers/ingredient.controller";
import categoryController from "../controllers/category.controller";

const router = Router()

router.get('/v1/category',categoryController.getAll)
router.get('/v1/category/:id',categoryController.getOneById)
router.post('/v1/category',[],categoryController.createItem)
router.delete('/v1/category/:id',[],categoryController.deleteItem)
router.put('/v1/category/:id',[],categoryController.updateItem)
// checkIsAuth


export default router
