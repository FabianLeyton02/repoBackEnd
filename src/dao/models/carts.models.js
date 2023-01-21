import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    products: {
      productCode: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  },
  { timestamps: true }
);

export const CartModel = mongoose.model("Cart", schema);
