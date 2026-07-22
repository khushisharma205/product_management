// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'General',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt aur updatedAt auto add honge
  }
);

module.exports = mongoose.model('Product', productSchema);