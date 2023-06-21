const path = require('path');

module.exports = {
  development: {
    dialect: "postgres",
    username: "postgres",
    password: "admin",
    database: "quanlicuahang",
    host: "localhost",
    'seeders-path': path.resolve('seeders'),
  },
  // Các môi trường khác (production, test)

};
