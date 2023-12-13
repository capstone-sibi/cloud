'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('Sets', [
        {
          title: 'Set 1'
        },
        {
          title: 'Set 2'
        },
        {
          title: 'Set 3'
        },
        {
          title: 'Set 4'
        },
        {
          title: 'Set 5'
        },
        {
          title: 'Set 6'
        },
        {
          title: 'Set 7'
        },
        {
          title: 'Set 8'
        },
        {
          title: 'Set 9'
        },
        {
          title: 'Set 10'
        }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sets', null, {});
  }
};
