"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Contract extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contract.belongsTo(models.User, {
        foreignKey: "freelancer_id",
        targetKey: "id",
        as: "freelancerData",
      });
      Contract.belongsTo(models.Store, {
        foreignKey: "store_id",
        targetKey: "id",
        as: "storeData",
      });
    }
  }
  Contract.init(
    {
      freelancer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      store_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      status: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Contract",
    }
  );
  return Contract;
};
