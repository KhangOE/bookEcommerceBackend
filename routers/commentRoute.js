const express = require("express");
const route = express.Router();
const IsLogin = require("../middleware/IsLogin");
const {
  postComment,
  deleteComment,
  getCommentByProductId,
} = require("../controllers/commentController");

route.post("/", postComment);

route.delete("/:id", IsLogin, deleteComment);

route.get("/product/:id", getCommentByProductId);
module.exports = route;
