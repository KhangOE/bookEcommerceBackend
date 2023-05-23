const { response } = require("express");
const Comment = require("../models/Comment");
const Product = require("../models/Product");
const User = require("../models/User");
const Role = require("../models/role");
const postComment = async (req, res) => {
  try {
    const newCommnet = new Comment({
      ...req.body,
    });
    await newCommnet.save();
    const comment = await Comment.findOne({ _id: newCommnet._id });

    await addCommentToProduct(req.body.productId, comment._id);
    await addCommentToUser(req.body.userId, comment._id);
    const commentToReturn = await comment.populate("userId");
    return res.json({
      success: true,
      comment: commentToReturn,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const addCommentToProduct = async (pId, cId) => {
  return Product.findByIdAndUpdate(
    pId,
    { $push: { comment: cId } },
    { new: true, useFindAndModify: false }
  );
};

const addCommentToUser = async (uId, cId) => {
  return User.findByIdAndUpdate(
    uId,
    { $push: { comment: cId } },
    { new: true, useFindAndModify: false }
  );
};
const deleteComment = async (req, res) => {
  const _id = req.params.id;
  try {
    const deleteComment = await Comment.findOneAndDelete({ _id });
    if (deleteComment) {
      return res.json({
        success: true,
        message: "Delete comment success!",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const getCommentByProductId = async (req, res) => {
  const productId = req.params.id;
  console.log(req.params.id);
  try {
    const comments = await Comment.find({ productId }).populate("userId");
    return res.json({
      success: true,
      comments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

module.exports = {
  postComment,
  deleteComment,
  getCommentByProductId,
};
