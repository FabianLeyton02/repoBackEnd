import { CartModel } from "../dao/models/carts.models.js";

export async function getCart(Id) {
  try {
    const Cart = await CartModel.findById(Id);
    return Cart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCarts() {
  try {
    const Carts = await CartModel.find({ deletedAt: { $exists: false } });
    return Carts;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createCart(data) {
  try {
    const Cart = await CartModel.create(data);
    return Cart;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function updateCart(Id, data) {
  try {
    const updatedCart = await CartModel.findByIdAndUpdate(Id, data, {
      new: true,
    });
    return updatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteUser(Id) {
  try {
    await CartModel.delete({ _Id: Id });
  } catch (error) {
    throw new Error(error.message);
  }
}
