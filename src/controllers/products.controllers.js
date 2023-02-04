import * as ProductService from "../services/products.service.js";
import { STATUS } from "../constants/constants.js";

export async function getProduct(req, res) {
  try {
    const { codeProduct } = req.params;
    const response = await ProductService.getProduct(codeProduct);
    res.json({
      Product: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function getProducts(req, res) {
  try {
    const { page } = req.query || 1;
    const { limit } = req.query || 10;
    const response = await ProductService.getProducts(page, limit);
    res.json({
      Products: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function createProduct(req, res) {
  try {
    const { body } = req;
    const response = await ProductService.createProduct(body);
    res.status(201).json({
      Product: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
export async function updateProduct(req, res) {
  try {
    const { codeProduct } = req.params;
    const { body } = req;
    const response = await ProductService.updateProduct(codeProduct, body);
    res.status(201).json({
      Product: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
export async function deleteProduct(req, res) {
  try {
    const { codeProduct } = req.params;
    await ProductService.deleteProduct(codeProduct);
    res.status(201).json({
      message: "Producto borrado correctamente",
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
