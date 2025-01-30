const express = require("express");
const RoleController = require("../controllers/RoleController");

const router = express.Router();

router.route("/getroles").get(RoleController.getRoles);

module.exports = router;
