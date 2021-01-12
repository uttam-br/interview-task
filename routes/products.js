var express = require("express");
var router = express.Router();
const Product = require("../models/Product");
const User = require("../models/User");

router.get("/", async (req, res) => {
  if (!req.session.loggedin) return res.json({ error: "something went wrong" });
  const userQuery = await User.findOne({ email: req.session.loggedin });
  const products = userQuery.products;
  res.json({ products });
});

router.post("/", async (req, res) => {
  if (!req.session.loggedin) return res.json({ error: "something went wrong" });
  const { name, type, size, quantity, color } = req.body;
  const product = new Product(req.body);
  const autherUser = await User.findOne({ email: req.session.loggedin });
  autherUser.products.push(product);
  await autherUser.save();
  res.json({ message: "Product added successfully" });
});

router.put("/", async (req, res) => {
  if (!req.session.loggedin) return res.json({ error: "something went wrong" });
  const { id, name, type, size, quantity, color } = req.body;
  const autherUser = await User.findOne({ email: req.session.loggedin });
  autherUser.products.forEach((product) => {
    if (product._id == id) {
      product.name = name;
      product.type = type;
      product.size = size;
      product.quantity = quantity;
      product.color = color;
    }
  });
  await autherUser.save();
  res.json({ message: "Product updated successfully" });
});

router.delete("/", async (req, res) => {
  if (!req.session.loggedin) return res.json({ error: "something went wrong" });
  const { id } = req.body;
  const autherUser = await User.findOne({ email: req.session.loggedin });
  console.log(autherUser.products);
  autherUser.products = autherUser.products.filter(
    (product) => product._id != id
  );
  await autherUser.save();
  res.json({ message: "Product updated successfully" });
});

module.exports = router;
