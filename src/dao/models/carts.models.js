import mongoose, { Schema } from "mongoose";

let itemSchema = new mongoose.Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Products" },
    quantity: { type: Number, default: 1 },
  },
  { timestamps: true }
);

const schema = new mongoose.Schema(
  {
    items: [itemSchema],
    subtotal: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const CartModel = mongoose.model("Cart", schema);
