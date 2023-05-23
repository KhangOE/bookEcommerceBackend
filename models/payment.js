{
  timestamps: true;
}
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentDetails = new Schema(
  {
    OrderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    amound: {
      type: Number,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PaymentDetailsModels = mongoose.model("PaymentDetails", PaymentDetails);

module.exports = PaymentDetailsModels;
