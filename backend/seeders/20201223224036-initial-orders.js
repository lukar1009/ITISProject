'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Orders", [
      {
        userId: 13,
        deliveryAddress: "Aleksinackih rudara 53"
      },
      {
        userId: 14,
        deliveryAddress: "Otona Zupancica 34"
      },
      {
        userId: 15,
        deliveryAddress: "Gandijeva 20"
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Orders", null, {});
  }
};
