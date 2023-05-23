const Category = require("../models/Category");
const createCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      ...req.body,
    });
    await newCategory.save();

    return res.json({
      Category: newCategory,
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

const getCategory = async (req, res) => {
  try {
    //   console.log(req.query);
    const category = await Category.find();
    return res.json({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    //   console.log(req.query);
    const category = await Category.findOne({ _id: req.params.id });
    return res.json({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

module.exports = { getCategory, createCategory, getCategoryById };
