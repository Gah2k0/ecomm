'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payments.init({
    nameOnCard: DataTypes.STRING,
    value: DataTypes.DECIMAL(15, 2),
    cardNumber: DataTypes.STRING(16),
    expirationDate: DataTypes.STRING(7),
    cvv: DataTypes.STRING(3),
    status: { type:DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Payments',
  });
  return Payments;
};