const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Role = new Schema({
  name: {
    type: String,
  },
});

const RoleModels = mongoose.model("Role", Role);

module.exports = RoleModels;
