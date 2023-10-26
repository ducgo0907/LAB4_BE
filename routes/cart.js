import express from "express";
import { cartController } from "../controllers/index.js";


// Khai báo đối tượng router
const cartRouter = express.Router();

cartRouter.post('/', cartController.create);
cartRouter.put('/', cartController.addProduct);
cartRouter.get('/list', cartController.all)
cartRouter.get('/:id', cartController.view);
cartRouter.put('/custom', cartController.addCustomProduct)
cartRouter.put('/removeProduct', cartController.remove)

export default cartRouter;