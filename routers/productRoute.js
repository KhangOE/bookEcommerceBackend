const express = require("express");
const route = express.Router();
const IsLogin = require("../middleware/IsLogin");

const {
  postProduct,
  deleteProduct,
  getProduct,
  getProductById,
  getProductNew,
} = require("../controllers/productControllers");
// POST
// post Product
route.post("/", postProduct);

// DELETE
// delete Product
route.delete("/:id", deleteProduct);

route.get("/:id", getProductById);
route.get("/n/:id", getProductById);
// GET
// get Product
route.get("/", getProduct);

module.exports = route;
