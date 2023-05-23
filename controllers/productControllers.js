const { response } = require("express");
const Product = require("../models/Product");
const Author = require("../models/author");
const Category = require("../models/Category");
const { removeAccents } = require("../helper/removeAccent");
const { dynamicSort } = require("../helper/dynamicSort");
const postProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body,
    });
    await newProduct.save();

    await req.body.category.forEach(async (i) => {
      await addProductToCategory(newProduct._id, i);
    });

    await req.body.author.forEach(async (i) => {
      await addProductToAuthor(newProduct._id, i);
    });

    return res.json({
      id: newProduct._id,
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

const addProductToAuthor = async (pId, aId) => {
  return Author.findByIdAndUpdate(
    aId,
    { $push: { product: pId } },
    { new: true, useFindAndModify: false }
  );
};

const addProductToCategory = async (pId, cId) => {
  return Category.findByIdAndUpdate(
    cId,
    { $push: { product: pId } },
    { new: true, useFindAndModify: false }
  );
};

const deleteProduct = async (req, res) => {
  const _id = req.params.id;
  try {
    const deleteProduct = await Product.findOneAndDelete({ _id });
    if (deleteProduct) {
      return res.json({
        success: true,
        message: "Delete Product success!",
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
// const getSearchProduct = async (req, res) => {
//   try {
//     // console.log(req.query);
//     const products = await (
//       await Product.find()
//     )
//       .filter((p) => {
//         return p.name.includes(req.params.query);
//       })
//       .populate({
//         path: "comment",
//         populate: {
//           path: "userId",
//         },
//       })
//       .populate(["category", "author"]);
//     return res.json({
//       success: true,
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: "Server not found!",
//     });
//   }
// };
const getProduct = async (req, res) => {
  try {
    // console.log(req.query.filter.author);
    const author = req.query.filter.author;
    const category = req.query.filter.category;
    const priceFrom = req.query.filter.priceFrom;
    const priceTo = req.query.filter.priceTo;
    const sort = req.query.filter.sort;
    const search = req.query.filter.search;
    console.log(search);
    const products = await Product.find().populate(["author", "category"]);

    const productsFilter = products.filter((p) => {
      return (
        (!author || author.some((a) => p.author.includes(a))) &&
        (!category || category.some((c) => p.category.includes(c))) &&
        (!priceFrom || p.price > priceFrom) &&
        (!priceTo || p.price < priceTo) &&
        (!search ||
          removeAccents(p.title)
            .toLowerCase()
            .includes(removeAccents(search).toLowerCase()))
      );
    });
    // .populate("category");

    const productSort =
      sort == 3
        ? productsFilter.sort(dynamicSort("price"))
        : sort == 4
        ? productsFilter.sort(dynamicSort("price")).reverse()
        : productsFilter;
    console.log(products.length, productsFilter.length);
    // .populate({
    //   path: "comment",
    //   populate: {
    //     path: "userId",
    //   },
    // })
    // .populate(["category", "author"]);
    return res.json({
      success: true,
      products: productSort,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const getSearchProduct = async (req, res) => {
  try {
    // console.log(req.query.filter.author);
    const author = req.query.filter.author || null;
    const category = req.query.filter.category || null;
    const priceFrom = req.query.filter.priceFrom || null;
    const priceTo = req.query.filter.priceTo || null;
    const products = await Product.find();

    const productsFilter = products.filter((p) => {
      return (
        (!author || author.some((a) => p.author.includes(a))) &&
        (!category || category.some((c) => p.category.includes(c))) &&
        (!priceFrom || p.price > priceFrom) &&
        (!priceTo || p.price < priceTo)
      );
    });

    console.log(products.length, productsFilter.length);
    // .populate({
    //   path: "comment",
    //   populate: {
    //     path: "userId",
    //   },
    // })
    // .populate(["category", "author"]);
    return res.json({
      success: true,
      products: productsFilter,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};
const getProductNew = async (req, res) => {
  try {
    //const _id = req.params.id;
    const products = await Product.find();
    //   .populate(["author", "category"])
    //   // .sortBy(function (o) {
    //   //   return new Date(o.createdAt);
    //   // })
    //   .slice(0, 5);
    return res.json({
      success: true,
      // product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const _id = req.params.id;
    const product = await Product.findOne({ _id }).populate([
      "author",
      "category",
    ]);
    return res.json({
      success: true,
      product,
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
  getProductNew,
  postProduct,
  deleteProduct,
  getProduct,
  getProductById,
};
