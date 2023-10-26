import cartRouter from "./cart.js";
import commentRouter from "./commnet.js";
import imageRouter from "./image.js";
import productRouter from "./product.js";
import userRouter from "./user.js";
import express from "express";

const router = express.Router();

router.use("/users", userRouter);
router.use("/image", imageRouter);
router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/comment", commentRouter);

export default router;