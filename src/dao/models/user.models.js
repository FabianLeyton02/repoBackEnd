import { Schema, model, SchemaType } from "mongoose";

const schema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true, min: 0 },
    password: { type: String, required: true, minLength: 6 },
    cartId: { type: Schema.Types.ObjectId, ref: "Carts" },
    role: { type: String, required:true, default: "user" },
  },
  { timestamps: true }
);

export const UserModel = model("Users", schema);
