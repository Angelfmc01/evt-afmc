import {Router} from "express"
import productsController from "../controllers/products.controller.js"

const productsRouter = Router()

productsRouter.get("/get", productsController.getProducts)
productsRouter.get("/create", productsController.createProduct)

export default productsRouter