const mongoose = require("mongoose");

const SubCategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: [true, "Category Name Exist"],
  },
  description: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // This references the Category model
    required: true,
  },
});

module.exports = mongoose.model("Subcategory", SubCategorySchema);
