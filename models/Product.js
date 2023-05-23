const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    author: [
      {
        type: Schema.Types.ObjectId,
        ref: "Author",
      },
    ],
    comment: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    imageUrl: {
      type: String,
      //   required: true,
    },
    rating: {
      type: Number,
      // required: true,
    },
  },
  { timestamps: true }
);

const ProductModels = mongoose.model("Product", Product);

module.exports = ProductModels;
