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

module.exports = mongoose.model("Product", productSchema);
