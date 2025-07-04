import {Router} from "express"
import historiesController from "../controllers/histories.controller.js"

const historiesRouter = Router()

historiesRouter.get("/get", historiesController.getHistories)


export default historiesRouter