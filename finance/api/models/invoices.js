const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Invoices extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Invoices.belongsTo(models.Payments, {
        foreignKey: 'payment_id',
      });
    }
  }
  Invoices.init({
    description: DataTypes.JSON,
  }, {
    sequelize,
    modelName: 'Invoices',
  });
  return Invoices;
};
