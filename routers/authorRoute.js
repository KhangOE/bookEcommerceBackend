const express = require("express");
const route = express.Router();
const IsLogin = require("../middleware/IsLogin");

const {
  getAuthor,
  getAuthorById,
  createAuthor,
} = require("../controllers/authorController");
// POST
// post Product
route.post("/", createAuthor);

route.get("/:id", getAuthorById);
// GET
// get Product
route.get("/", getAuthor);

module.exports = route;
