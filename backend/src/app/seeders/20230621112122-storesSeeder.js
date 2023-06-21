"use strict";

const { DATE } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // // Lấy model Store từ `models`
    // const { Store } = queryInterface.sequelize.models;

    // Chèn dữ liệu mẫu
    return queryInterface.bulkInsert('Stores', [
      {
        owner_id: 1,
        name: "Store 1",
        logo: "logo1.jpg",
        address: "123 Street, City",
        phone_number: "0987625632",
        email: "store1@example.com",
        createdAt: "2023-06-21 17:02:06.095+07",
        updatedAt: "2023-06-21 17:02:06.095+07"
      },
      {
        owner_id: 1,
        name: "Store 2",
        logo: "logo2.jpg",
        address: "456 Street, City",
        phone_number: "0914345234",
        email: "store2@example.com",
        createdAt: "2023-06-21 17:05:00.095+07",
        updatedAt: "2023-06-21 17:05:00.095+07"
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Xóa toàn bộ dữ liệu trong bảng `stores`
    await queryInterface.bulkDelete("Stores", null, {});
  },
};
