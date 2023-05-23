const { response } = require("express");

const OderItem = require("../models/oderItem");
const Oder = require("../models/oders");
const User = require("../models/User");
const postOder = async (req, res) => {
  try {
    const newOrder = new Oder({
      userId: req.body.userId,
      total: req.body.total,
      payment: req.body.payment,
    });
    await newOrder.save();
    await addOderToUser(newOrder._id, req.body.userId);
    await req.body.orderItems.forEach(async (element) => {
      await createOrderItem(element, newOrder._id);
    });

    return res.json({
      success: true,
      newOrder,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server not found!",
    });
  }
};

const addOderToUser = async (oId, uId) => {
  return User.findByIdAndUpdate(
    uId,
    { $push: { oders: oId } },
    { new: true, useFindAndModify: false }
  );
};

const createOrderItem = async (item, oderId) => {
  const newOrderItem = new OderItem({
    ...item,
  });
  await newOrderItem.save();
  return Oder.findByIdAndUpdate(
    oderId,
    { $push: { oderItems: newOrderItem._id } },
    { new: true, useFindAndModify: false }
  );
};

const getOder = async (req, res) => {
  try {
    const Oders = await Oder.find().populate({
      path: "oderItems",
      populate: { path: "productId" },
    });
    return res.json({
      success: true,
      Oders,
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
  postOder,
  // deleteOrder,
  getOder,
};
