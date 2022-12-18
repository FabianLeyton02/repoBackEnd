import { Router } from "express";
import { CartManager, Cart } from "../../src/CartManager.js";

const router = Router();
const carts = new CartManager();

router.post("/", (req, res) => {
  const { id } = req.body;
  res.status(201).json(carts.createCart(id));
});

router.get("/:cid", (req, res) => {
  const { cid } = req.params;
  res.status(201).json(carts.showCartById(cid));
});

router.post("/:cid/product/:pid", (req, res) => {
  const { cid, pid } = req.params;
  res.status(201).send(carts.addToCartId(cid, pid));
});

export default router;
