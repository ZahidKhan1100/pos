const Employee = require("../models/Employee");
const bcrypt = require("bcrypt");

async function addEmployee(req, res, next) {
  try {
    const { name, email, password, contact, role_id, id } = req.body;
    if (id === "") {
      const EmployeeExist = await Employee.findOne({ name });
      if (EmployeeExist)
        return res.json({ message: "Employee Exist", status: false });
      const hashedPassword = await bcrypt.hash(password, 10);

      const employee = await Employee.create({
        name,
        email,
        password: hashedPassword,
        contact,
        role_id,
      });

      return res.json({ status: true, employee });
    } else {
      const employee = await Employee.findByIdAndUpdate(
        id,
        {
          name,
          email,
          contact,
          role_id,
        },
        { new: true }
      );
      return res.json({ status: "updated", employee });
    }
  } catch (ex) {
    next(ex);
  }
}

async function getEmployees(req, res, next) {
  try {
    const employees = await Employee.find();
    return res.json({ status: true, employees });
  } catch (ex) {
    next(ex);
  }
}

async function deleteEmployee(req, res, next) {
  try {
    const id = req.params.id;
    const deleteEmployee = await Employee.findByIdAndDelete(id);

    if (deleteEmployee) return res.json({ status: true, deleteEmployee });

    return res.json({ status: false, message: "SOmething went wrong" });
  } catch (ex) {
    next(ex);
  }
}
module.exports = { addEmployee, getEmployees, deleteEmployee };
