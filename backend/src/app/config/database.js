const { Sequelize } = require("sequelize");

// Kết nối đến cơ sở dữ liệu PostgreSQL
const sequelize = new Sequelize("quanlicuahang", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
