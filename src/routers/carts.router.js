import { Router } from "express";
import * as CartsController from "../controllers/carts.controllers.js";

const route = Router();
route.get("/", CartsController.getCarts);
route.get("/:idCart", CartsController.getCart);
route.post("/", CartsController.createCart);
route.put("/:idCart", CartsController.updateCart);
route.delete("/:idCart", CartsController.deleteCart);

export default route;
