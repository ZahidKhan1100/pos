const ProductModel = require("../model/ProductModel");

async function getProducts(req, res) {
  try {
    console.log("get products");
    // const result = await ProductModel.find().populate({
    //   path: "subcategory_id",
    //   populate: { path: "category_id" },
    // });
    const result = await ProductModel.find().populate({
        path: "subcategory_id",
        populate: {
          path: "category_id",
          select: "name", // Include only the 'name' field from the 'category_id' sub-document
        },
        select: "name", // Include only the 'name' field from the 'subcategory_id' sub-document
      }); // Include only the 'name' field from the 'ProductModel' document itself
  
    return res.status(200).send(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
}

async function addProduct(req, res) {
  const {
    name,
    description,
    subcategory_id,
    s_price,
    p_price,
    quantity_in_stock,
    unit_of_measurement,
    manufacturer,
    picture,
  } = req.body;

  try {
    const existingProduct = await ProductModel.findOne({ name });

    if (existingProduct) {
      return res.status(404).send({ error: "Product already exists" });
    }

    const product = new ProductModel({
      name,
      description,
      subcategory_id,
      s_price,
      p_price,
      quantity_in_stock,
      unit_of_measurement,
      manufacturer,
      picture,
    });

    const result = await product.save();
    return res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getProducts,
  addProduct,
};
