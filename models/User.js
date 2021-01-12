const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  size: {
    type: String,
  },
  quantity: {
    type: Number,
  },
  color: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  products: [productSchema],
});

module.exports = mongoose.model("User", userSchema);
