const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Databse connected");
  } catch (error) {
    console.log("something went wrong with database connection");
  }
};


module.exports = connectDB;