"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Store.belongsTo(models.User, {
        foreignKey: "owner_id",
        targetKey: "id",
        as: "ownerData",
      });
      Store.hasMany(models.Contract, { foreignKey: "store_id" });
      Store.hasMany(models.WordRequest, { foreignKey: "store_id" });
    }
  }
  Store.init(
    {
      owner_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      logo: DataTypes.STRING,
      address: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Store",
    }
  );
  return Store;
};
