'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Luka Radovanovic',
        email: 'lukaradovanovic@gmail.com',
        password: '12345',
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ivana Ivanovic',
        email: 'ivanaivanovic@gmail.com',
        password: '12345',
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Nikola Skrelji',
        email: 'nikolaskrelji@gmail.com',
        password: '12345',
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
