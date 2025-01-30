const express = require("express");
const ProductController = require("../controllers/ProductController");

const router = express.Router();

router.route("/addproduct").post(ProductController.addProduct);
router.route("/getproducts").get(ProductController.getProducts);
router.route("/deleteproduct/:id").delete(ProductController.deleteProduct);

module.exports = router;
