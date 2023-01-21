import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    user: { type: String, requiered: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const MessagesModel = mongoose.model("Message", schema);
