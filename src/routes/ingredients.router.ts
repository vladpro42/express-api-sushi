import {Router} from "express"
import {checkIsAuth} from "../middlewares/checkIsAuth";
import ingredientController from "../controllers/ingredient.controller";

const router = Router()

router.get('/v1/ingredients',ingredientController.getAll)
router.get('/v1/ingredients/:id',ingredientController.getOneById)
router.post('/v1/ingredients',[],ingredientController.createItem)
router.delete('/v1/ingredients/:id',[],ingredientController.deleteItem)
router.put('/v1/ingredients/:id',[],ingredientController.updateItem)
// checkIsAuth


export default router
