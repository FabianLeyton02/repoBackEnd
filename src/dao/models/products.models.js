import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    title: { type: String, requiered: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    thumbnail: { type: String },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true, min: 0 },
    status: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Products", schema);
