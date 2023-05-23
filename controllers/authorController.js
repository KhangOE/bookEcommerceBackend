const Author = require("../models/author");

const createAuthor = async (req, res) => {
  try {
    const newAuthor = new Author({
      ...req.body,
    });
    await newAuthor.save();

    return res.json({
      Author: newAuthor,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const getAuthor = async (req, res) => {
  try {
    //   console.log(req.query);
    const Authors = await Author.find();
    return res.json({
      success: true,
      Authors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const getAuthorById = async (req, res) => {
  try {
    //   console.log(req.query);
    const Authors = await Author.findOne(req.params.id);
    return res.json({
      success: true,
      Authors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

module.exports = { getAuthor, createAuthor, getAuthorById };
