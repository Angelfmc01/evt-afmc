import {Router} from "express"
import productsController from "../controllers/products.controller.js"

const productsRouter = Router()

productsRouter.get("/get", productsController.getProducts)
productsRouter.post("/create", productsController.createProduct)
productsRouter.post("/update", productsController.updateProduct)

export default productsRouter