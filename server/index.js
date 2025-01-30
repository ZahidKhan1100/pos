const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./database/connection");
const categoryRoutes = require("./routes/categoryRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const roleRoutes = require("./routes/roleRoutes");
const permissionRoutes = require("./routes/permissionRoutes");
const productRoutes = require("./routes/productRoutes");
const saleRoutes = require("./routes/saleRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/category", categoryRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/product", productRoutes);
app.use("/api/sale", saleRoutes);
app.use("/api/auth", authRoutes);

//localhost:3100/api/category/addcategory

http: connectDB()
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`App running on port ${process.env.PORT}`);
  })
  .catch((err) => {
    console.log(err);
  });
