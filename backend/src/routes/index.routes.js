import { Router } from "express";
import productsRouter from "./products.routes.js";
import historiesRouter from "./histories.routes.js";
import userRouter from "./user.routes.js";
import validateJWT from "../middleware/jwt.middleware.js";

const router = Router();

router.use("/products", validateJWT, productsRouter);
router.use("/histories", validateJWT, historiesRouter);
router.use("/auth", userRouter);

export default router;
