const CategoryModel = require("../model/CategoryModel");

async function getCategories(req, res) {
  try {
    const result = await CategoryModel.find();
    return res.status(200).send(result);
  } catch (error) {
    return res.status(500).send({ error: "Server error" });
  }
}

async function addCategory(req, res) {
  console.log(req);
  try {
    const { name, description } = req.body;

    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(404).send({ error: "Category Exist" });
    }
    const category = new CategoryModel({
      name,
      description,
    });
    const result = await category.save();
    return res.status(201).send({ msg: "Category added successfully" });
  } catch (error) {
    return res.status(500).send({ error: "server error" });
  }
}

async function updateCategory(req, res) {
  // console.log("req params",req.query.category_id);
  try {
    const { name, description } = req.body;
    const category_id  = req.query.category_id;

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      category_id,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({ error: "Category not found" });
    }

    return res
      .status(200)
      .send({ msg: "Category updated successfully", updatedCategory });
  } catch (error) {
    return res.status(500).send({ error: "Server error" });
  }
}

async function deleteCategory(req, res) {
  try {
    const { category_id } = req.params;

    const deleteCategory = await CategoryModel.findByIdAndDelete(category_id);

    if (!deleteCategory) {
      return res.status(404).send({ error: "Category not found" });
    }

    return res
      .status(200)
      .send({ msg: "Category deleted successfully", deleteCategory });
  } catch (error) {
    return res.status(500).send({ error: "Server error" });
  }
}

module.exports = {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory
};
