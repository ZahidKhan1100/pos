const express = require("express");
const CategoryController = require("../controllers/CategoryController");


const router = express.Router();

router.route('/addcategory').post(CategoryController.addCategory)
router.route('/getcategories').get(CategoryController.getCategories)
router.route('/deletecategory/:id').delete(CategoryController.deleteCategory)

module.exports = router;

