const express = require("express");
const route = express.Router();
const IsLogin = require("../middleware/IsLogin");

const { postOder, getOder } = require("../controllers/oderControllers");
// POST
// post Product
route.post("/", postOder);

// DELETE
// delete Product
///route.delete("/:id", deleteProduct);

//route.get("/:id", getProductById);
// GET
// get Product
route.get("/", getOder);

module.exports = route;
