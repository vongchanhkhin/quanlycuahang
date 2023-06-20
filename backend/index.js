const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/app/config/database");

dotenv.config();

const app = express();



// Kiểm tra kết nối cơ sở dữ liệu
sequelize
  .authenticate()
  .then(() => {
    console.log("Successful connection to the database.");
  })
  .catch((error) => {
    console.error("Unable to connect to database:", error);
  });

const port = process.env.PORT || 8000;

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
