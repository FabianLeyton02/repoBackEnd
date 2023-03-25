import { Router } from "express";
import * as ProductsController from "../controllers/products.controllers.js";

class ProductRouter {
  constructor() {
    this.router = Router();
    this.router.get("/", ProductsController.getProducts);
    this.router.get(
      "/:codeProduct",
      ProductsController.getProduct,
      (req, res) => {
        const { code } = req.params;
        if (code == ''){
          customError.createError("getProductError", "codigo vacio", "El codigo no puede ser vacio", 3);
        }
      }
    );
    this.router.post("/", ProductsController.createProduct);
    this.router.put("/:codeProduct", ProductsController.updateProduct);
    this.router.delete("/:codeProduct", ProductsController.deleteProduct);
  }
  getRouter() {
    return this.router;
  }
}

export default new ProductRouter();
