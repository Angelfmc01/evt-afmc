import userController from "../controllers/user.controller.js";
import { Router } from "express";

const userRouter = Router()

userRouter.get('/login', userController.loginUser)


export default userRouter