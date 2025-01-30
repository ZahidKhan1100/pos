const Category = require("../models/Category");

async function addCategory(req, res, next) {
  try {
    const { name, description, id } = req.body;

    if (id === "") {
      const categoryExist = await Category.findOne({ name });
      if (categoryExist)
        return res.json({ message: "Category Exist", status: false });

      const category = await Category.create({
        name,
        description,
      });

      return res.json({ status: true, category });
    } else {
      const category = await Category.findByIdAndUpdate(
        id,
        {
          name,
          description,
        },
        { new: true }
      );
      return res.json({ status: "updated", category });
    }
  } catch (ex) {
    next(ex);
  }
}

async function getCategories(req, res, next) {
  try {
    const categories = await Category.find();
    return res.json({ status: true, categories });
  } catch (ex) {
    next(ex);
  }
}

async function deleteCategory(req, res, next) {
  try {
    const id = req.params.id;
    const deleteCategory = await Category.findByIdAndDelete(id);

    if (deleteCategory) return res.json({ status: true, deleteCategory });

    return res.json({ status: false, message: "SOmething went wrong" });
  } catch (ex) {
    next(ex);
  }
}
module.exports = { addCategory, getCategories, deleteCategory };
