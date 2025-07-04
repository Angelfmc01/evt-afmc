import {Router} from "express"
import productsRouter from "./products.routes.js"
import historiesRouter from "./histories.routes.js"
import userRouter from "./user.routes.js"

const router = Router()

router.use("/products", productsRouter)
router.use("/histories", historiesRouter)
router.use("/auth", userRouter)


export default router