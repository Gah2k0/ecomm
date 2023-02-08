'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nameOnCard: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.DECIMAL(15, 2)
      },
      cardNumber: {
        type: Sequelize.STRING(16)
      },
      expirationDate: {
        type: Sequelize.STRING(7)
      },
      cvv: {
        type: Sequelize.STRING(3)
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Payments');
  }
};