import { Router } from "express";
import { Product, ProductManager } from "../public/js/ProductManager.js";

let productManager = new ProductManager("../../data");
const router = Router();

router.get("/", (req, res) => {
  const { limit } = req.query;
  if (limit) {
    res.json(productManager.getProductsAmount(limit));
  } else {
    res.json(productManager.getProducts());
  }
});

router.get("/:pid", (req, res) => {
  const { pid } = req.params;
  const product = productManager.getProductById(pid);
  if (product) {
    res.json(product);
  } else {
    res.send("<h2>ERROR: not found</h2>");
  }
});

router.put("/", (req, res) => {
  const { id, title, description, price, thumbnail, code, stock, category } =
    req.body;
  res
    .status(201)
    .json(
      productManager.updateProduct(
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category
      )
    );
});

router.delete("/", (req, res) => {
  const { id } = req.body;
  res.status(201).json(productManager.deleteProduct(id));
});

router.post("/", (req, res) => {
  const { id, title, description, price, thumbnail, code, stock, category } =
    req.body;

  res
    .status(201)
    .json(
      productManager.addProduct(
        new Product(title, description, price, thumbnail, code, stock, category)
      )
    );
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts");
});

export default router;
