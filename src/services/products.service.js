import { ProductModel } from "../dao/models/products.models.js";

export async function getProduct(code) {
  try {
    const product = await ProductModel.findById(code);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getProducts() {
  try {
    const products = await ProductModel.find({ deletedAt: { $exists: false } });
    return products;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function createProduct(data) {
  try {
    const product = await ProductModel.create(data);
    return product;
  } catch (error) {
    throw new Error(error.message);
  }
}
export async function updateProduct(code, data) {
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(code, data, {
      new: true,
    });
    return updatedProduct;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function deleteUser(code) {
  try {
    await ProductModel.delete({ _code: code });
  } catch (error) {
    throw new Error(error.message);
  }
}
