const express = require("express");
const route = express.Router();
const IsLogin = require("../middleware/IsLogin");

const {
  getCategory,
  getCategoryById,
  createCategory,
} = require("../controllers/categoryController");
// POST
// post Product
route.post("/", createCategory);

// DELETE
// delete Product
///route.delete("/:id", deleteProduct);

route.get("/:id", getCategoryById);

route.get("/new", (req, res) => {
  return res.json({
    a: 2,
  });
});

route.get("/", getCategory);

module.exports = route;
