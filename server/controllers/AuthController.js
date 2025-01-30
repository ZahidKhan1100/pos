const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");
const Sale = require("../models/Sale");

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    console.log(email);
    const emailExist = await Employee.findOne({ email });

    if (!emailExist)
      return res.json({
        status: false,
        message: "Email doesn't exist please register first",
      });

    const isPasswordValid = await bcrypt.compare(password, emailExist.password);

    if (!isPasswordValid)
      return res.json({
        status: false,
        message: "Invalid Password",
      });

    const user = await Employee.aggregate([
      {
        $lookup: {
          from: "roles",
          localField: `${emailExist.role_id}`,
          foreignField: `${emailExist._id}`,
          as: "userWithRole",
        },
      },
      {
        $unwind: "$userWithRole",
      },
      {
        $project: {
          name: 1,
          email: 1,
          contact: 1,
          role_name: "$userWithRole.name",
          permissions: "$userWithRole.permissions",
        },
      },
    ]);
    // console.log(user);
    return res.json({ status: true, user: emailExist });
  } catch (error) {
    next(error);
  }
}

module.exports = { login };
