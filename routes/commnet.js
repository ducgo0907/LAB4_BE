import express from "express";
import { commentController } from "../controllers/index.js";

// Khai báo đối tượng router
const commentRouter = express.Router();

commentRouter.post('/', commentController.create);

export default commentRouter;