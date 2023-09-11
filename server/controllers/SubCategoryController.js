const SubCategoryModel = require("../model/SubCategoryModel");

async function getSubCategories(req, res) {
  try {
    const result = await SubCategoryModel.find()
      .populate("category_id", "name") // Populate the 'category_id' field and select only 'name'
      .exec();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ error: "Server error" });
  }
}

async function addSubCategory(req, res) {
  try {
    const { name, description, category_id } = req.body;

    const existingSubCategory = await SubCategoryModel.findOne({ name });
    if (existingSubCategory) {
      return res.status(404).send({ error: "Category Exist" });
    }
    const subCategory = new SubCategoryModel({
      name,
      description,
      category_id,
    });
    const result = await subCategory.save();
    return res.status(201).send({ msg: "Sub Category added successfully" });
  } catch (error) {
    return res.status(500).send({ error: "server error" });
  }
}

module.exports = {
  getSubCategories,
  addSubCategory,
};
