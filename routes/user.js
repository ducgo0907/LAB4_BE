import express from "express";
import { userController } from "../controllers/index.js";


// Khai báo đối tượng router
const userRouter = express.Router();

userRouter.post('/', userController.create)
userRouter.post('/login', userController.login);

export default userRouter;