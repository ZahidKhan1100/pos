const express = require("express");
const PermissionController = require("../controllers/PermissionController");

const router = express.Router();

router.route("/getpermissions").get(PermissionController.getPermissions);

module.exports = router;
