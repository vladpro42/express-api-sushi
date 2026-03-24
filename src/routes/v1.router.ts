import {Router} from "express"
import type { Request, Response } from "express"
import userController from "../controllers/user.controller";
import {checkIsAuth} from "../middlewares/checkIsAuth";

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json('hello world')
})

router.get('/v1/users',userController.getAllUsers)
router.get('/v1/users/:id',userController.getUserById)
router.post('/v1/users',[],userController.createUser)
router.delete('/v1/users/:id',[checkIsAuth],userController.deleteUser)
router.put('/v1/users/:id',[checkIsAuth],userController.updateUser)



export default router
