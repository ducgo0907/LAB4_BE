import express from "express";
import { productController } from "../controllers/index.js";


// Khai báo đối tượng router
const productRouter = express.Router();

productRouter.post('/', productController.create);
productRouter.get('/', productController.listProduct);
productRouter.get('/detail/:id', productController.detail);
productRouter.get('/:id/comments', productController.getComments)
export default productRouter;