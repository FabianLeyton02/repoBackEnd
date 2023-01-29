import mongoose from "mongoose";
import pagination from "mongoose-paginate-v2";
const schema = new mongoose.Schema(
  {
    title: { type: String, requiered: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 1 },
    thumbnail: { type: String },
    code: { type: String, required: true, unique: true, index: true },
    stock: { type: Number, required: true, min: 0 },
    status: { type: Boolean, required: true, default: true },
  },
  { timestamps: true }
);

schema.plugin(pagination);
export const ProductModel = mongoose.model("Products", schema);
