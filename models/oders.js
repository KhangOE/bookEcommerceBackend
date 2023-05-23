const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Oder = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    oderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "OderItem",
      },
    ],
    payment: {
      type: String,
      required: true,
      // ref: "Payment",
    },
    status: {
      type: String,
    },
  },
  { timestamps: true }
);

const OrderModels = mongoose.model("Oder", Oder);

module.exports = OrderModels;
