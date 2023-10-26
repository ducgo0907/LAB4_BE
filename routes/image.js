import express from "express";
import { imageController } from "../controllers/index.js";
import { __dirname } from "../server.js";

// Khai báo đối tượng router
const imageRouter = express.Router();

imageRouter.post('/', imageController.create);
imageRouter.get("/:id", imageController.detail)

export default imageRouter;