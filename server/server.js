const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./router/router");
const connectDB = require("./database/connection");
const bodyParser = require('body-parser');

const app = express();
const port = 4500;

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); // less hackers know about our stack

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use("/api", router);

connectDB()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid database connection...!");
  });
