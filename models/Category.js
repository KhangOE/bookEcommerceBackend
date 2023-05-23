const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema({
  name: {
    type: String,
    required: true,
  },
  product: [
    {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
  ],
});
const CategoryModels = mongoose.model("Category", Category);

module.exports = CategoryModels;
