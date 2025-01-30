const express = require("express");
const SaleController = require("../controllers/SaleController");

const router = express.Router();

router.route("/addsale").post(SaleController.addSale);
router.route("/getbills").get(SaleController.getBills);
router.route("/dailysales").get(SaleController.dailySales);
router
  .route("/dailyproductsales")
  .get(SaleController.dailyProductsSaleQuantity);

module.exports = router;
