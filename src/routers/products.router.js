import { Router } from "express";
import * as ProductsController from "../controllers/products.controllers.js";

const route = Router();
route.get("/", ProductsController.getProducts);
route.get("/:codeProduct", ProductsController.getProduct);
route.post("/", ProductsController.createProduct);
route.put("/:codeProduct", ProductsController.updateProduct);
route.delete("/:codeProduct", ProductsController.deleteProduct);

export default route;
