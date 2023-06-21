const express = require("express");
const dotenv = require("dotenv");
const sequelize = require("./src/app/config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./src/routes");

dotenv.config();

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

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

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

route(app);

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
