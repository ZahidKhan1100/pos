const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    subcategory_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory", // This references the Category model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    s_price: {
      type: Number,
    },
    p_price: {
      type: Number,
    },
    quantity_in_stock: {
      type: Number,
      default: 0,
    },
    unit_of_measurement: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
    },
    picture: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Enable timestamps
  }
);

module.exports = mongoose.model("Product", ProductSchema);
