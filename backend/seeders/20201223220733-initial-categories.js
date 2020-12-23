'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        title: "Pizza"
      },
      {
        title: "Sandwiches"
      },
      {
        title: "Pancakes"
      },
      {
        title: "Coffee"
      },
      {
        title: "Drinks"
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
