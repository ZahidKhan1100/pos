const express = require("express");
const EmployeeController = require("../controllers/EmployeeController");

const router = express.Router();

router.route("/addemployee").post(EmployeeController.addEmployee);
router.route("/getemployees").get(EmployeeController.getEmployees);
router.route("/deleteemployee/:id").delete(EmployeeController.deleteEmployee);

module.exports = router;
