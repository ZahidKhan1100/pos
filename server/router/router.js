const express = require("express");
const ProductController = require("../controllers/ProductController");
const CategoryController = require("../controllers/CategoryController");
const SubCategoryController = require("../controllers/SubCategoryController");

const router = express.Router();

// Category Controller

router.route("/getCategories").get(CategoryController.getCategories);
router.route("/addCategory").post(CategoryController.addCategory);
router
  .route("/updateCategory")
  .put(CategoryController.updateCategory);
router
  .route("/deleteCategory/:category_id")
  .put(CategoryController.deleteCategory);

// Sub Category Controller

router.route("/getSubCategories").get(SubCategoryController.getSubCategories);
router.route("/addSubCategory").post(SubCategoryController.addSubCategory);

// Product Controller
router.route("/getProducts").get(ProductController.getProducts);
router.route("/addProduct").post(ProductController.addProduct);

module.exports = router;
