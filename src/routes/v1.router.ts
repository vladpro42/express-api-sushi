import {Router} from "express"
import type { Request, Response } from "express"

const router = Router()

router.get('/', (req: Request, res: Response) => {
    res.json('hello world')
})

export default router
