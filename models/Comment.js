const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CommentModels = mongoose.model("Comment", Comment);

module.exports = CommentModels;
