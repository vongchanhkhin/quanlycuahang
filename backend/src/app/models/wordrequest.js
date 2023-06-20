"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WordRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WordRequest.belongsTo(models.User, {
        foreignKey: "freelancer_id",
        as: "Freelancer",
      });
      WordRequest.belongsTo(models.Store, { foreignKey: "store_id" });
    }
  }
  WordRequest.init(
    {
      freelancer_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "WordRequest",
    }
  );
  return WordRequest;
};
