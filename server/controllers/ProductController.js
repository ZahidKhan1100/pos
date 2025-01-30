const Product = require("../models/Product");
const bcrypt = require("bcrypt");

async function addProduct(req, res, next) {
  try {
    const { name, category_id, description, price, quantity_in_stock, id } =
      req.body;
    if (id === "") {
      const ProductExist = await Product.findOne({ name });
      if (ProductExist)
        return res.json({ message: "Product Exist", status: false });

      const product = await Product.create({
        name,
        category_id,
        description,
        price,
        quantity_in_stock,
      });

      return res.json({ status: true, product });
    } else {
      const product = await Product.findByIdAndUpdate(
        id,
        {
          name,
          category_id,
          description,
          price,
          quantity_in_stock,
        },
        { new: true }
      );
      return res.json({ status: "updated", product });
    }
  } catch (ex) {
    next(ex);
  }
}

async function getProducts(req, res, next) {
  try {
    const products = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "Category_details",
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          price: 1,
          quantity_in_stock: 1,
          category_id:1,
          category_name: { $arrayElemAt: ["$Category_details.name", 0] },
        },
      },
    ]);

    // const products = await Product.find();
    return res.json({ status: true, products });
  } catch (ex) {
    next(ex);
  }
}

async function deleteProduct(req, res, next) {
  try {
    const id = req.params.id;
    const deleteProduct = await Product.findByIdAndDelete(id);

    if (deleteProduct) return res.json({ status: true, deleteProduct });

    return res.json({ status: false, message: "SOmething went wrong" });
  } catch (ex) {
    next(ex);
  }
}
module.exports = { addProduct, getProducts, deleteProduct };
