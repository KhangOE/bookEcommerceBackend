// App
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Routers
const userRoute = require("../routers/userRoute");
const commentRoute = require("../routers/commentRoute");
const productRoute = require("../routers/productRoute");
const oderRoute = require("../routers/oderRoute");
const authorRoute = require("../routers/authorRoute");
const categoryRoute = require("../routers/categoryRoute");
const app = express();
const URLDB = `mongodb+srv://19521663:0383880624As@cluster0.9rniwmi.mongodb.net/?retryWrites=true&w=majority`;

// connectDB
const connectDB = async () => {
  try {
    await mongoose.connect(URLDB);
    console.log("connect DB success!");
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
};

connectDB();

// config body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello word");
});

// config route
app.use("/api/user", userRoute);
app.use("/api/product", productRoute);
app.use("/api/comment", commentRoute);
app.use("/api/oder", oderRoute);
app.use("/api/category", categoryRoute);
app.use("/api/author", authorRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}!`);
});
