'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Products", [
      {
        title: "Capricciosa",
        imageUrl: null,
        description: "Ham, tomato, cheese",
        price: 450,
        categoryId: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Margherita",
        imageUrl: null,
        description: "tomato, cheese",
        price: 350,
        categoryId: 16,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Ham Sandwich",
        imageUrl: null,
        description: "Ham, tomato, cheese",
        price: 150,
        categoryId: 17,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Nutella pancake",
        imageUrl: null,
        description: "Nutella, biscuit",
        price: 150,
        categoryId: 18,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Cappuccino",
        imageUrl: null,
        description: "Not so strong",
        price: 60,
        categoryId: 19,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Water",
        imageUrl: null,
        description: "Rosa",
        price: 60,
        categoryId: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Coca Cola",
        imageUrl: null,
        description: "Coca Cola",
        price: 70,
        categoryId: 20,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Products", null, {});
  }
};
