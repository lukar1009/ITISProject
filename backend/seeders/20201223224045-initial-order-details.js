'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("OrderDetails", [
      {
        orderId: 1,
        productId: 15,
        quantity: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 1,
        productId: 16,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 2,
        productId: 17,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        orderId: 3,
        productId: 18,
        quantity: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("OrderDetails", null, {});
  }
};
