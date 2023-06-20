"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Quan hệ 1-n với bảng Stores
      User.hasMany(models.Store, { foreignKey: "owner_id" });

      // Quan hệ 1-1 với bảng Contracts
      User.hasOne(models.Contract, {
        foreignKey: "freelancer_id"
      });

      // Quan hệ 1-n với bảng WordRequests
      User.hasMany(models.WordRequest, {
        foreignKey: "freelancer_id"
      });
    }
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      date_of_birth: DataTypes.DATE,
      gender: DataTypes.STRING,
      avatar: DataTypes.STRING,
      address: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_verify: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      unique_identifier: {
        type: DataTypes.STRING,
        unique: true
      }
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
