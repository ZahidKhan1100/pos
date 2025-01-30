const Role = require("../models/Role");

async function getRoles(req, res, next) {
  try {
    const roles = await Role.find();

    roles.map((role) => {
      role.permissions = role.permissions.join(",");
      return role;
    });

    res.json({ status: true, roles });
  } catch (ex) {
    next(ex);
  }
}

module.exports = { getRoles };
