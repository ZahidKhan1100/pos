const Permission = require("../models/Permission");

async function getPermissions(req, res, next) {
  try {
    const permissions = await Permission.find();
    res.json({ status: true, permissions });
  } catch (ex) {
    next(ex);
  }
}

module.exports = { getPermissions };
