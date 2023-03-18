import { Router } from "express";
import * as ProductsController from "../controllers/products.controllers.js";

class ProductRouter {
  constructor() {
    this.router = Router();
    this.router.get("/", ProductsController.getProducts);
    this.router.get("/:codeProduct", ProductsController.getProduct);
    this.router.post("/", ProductsController.createProduct);
    this.router.put("/:codeProduct", ProductsController.updateProduct);
    this.router.delete("/:codeProduct", ProductsController.deleteProduct);
  }
  getRouter() {
    return this.router;
  }
}

export default new ProductRouter();
