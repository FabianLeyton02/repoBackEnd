import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: schema.Types.ObjectId,
    code: {
      type: String,
      requiered: true,
      unique: true,
      default: () => {
        return (Math.floor(Math.random() * (10 - 6 + 1)) + 6).toString();
      },
    },
    purchase_datetime: { type: Date, required: true, default: Date.now },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
  },
  { timestamps: true }
);

export const TicketModel = mongoose.model("Ticket", schema);
