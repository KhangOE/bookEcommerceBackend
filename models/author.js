const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Author = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    product: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const AuthorModels = mongoose.model("Author", Author);

module.exports = AuthorModels;
