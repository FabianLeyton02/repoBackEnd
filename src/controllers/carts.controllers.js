import * as CartService from "../services/carts.service.js";
import { STATUS } from "../constants/constants.js";

export async function getCart(req, res) {
  try {
    const { idCart } = req.params;
    const response = await CartService.getCart(idCart);
    res.json({
      Cart: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function getCarts(req, res) {
  try {
    const response = await CartService.getCarts();
    res.json({
      Carts: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}

export async function createCart(req, res) {
  try {
    const { body } = req;
    const response = await CartService.createCart(body);
    res.status(201).json({
      Cart: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
export async function updateCart(req, res) {
  try {
    const { idCart } = req.params;
    const { body } = req;
    const response = await CartService.updateCart(idCart, body);
    res.status(201).json({
      Cart: response,
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}
export async function deleteCart(req, res) {
  try {
    const { idCart } = req.params;
    await CartService.deleteCart(idCart);
    res.status(201).json({
      message: "Carto borrado correctamente",
      status: STATUS.SUCCESS,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      status: STATUS.FAIL,
    });
  }
}