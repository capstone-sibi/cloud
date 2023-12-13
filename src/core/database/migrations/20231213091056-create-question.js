'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('Questions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null
      },
      filename: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      },
      setId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sets',
          key: 'id'
        },
      }
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('Questions');
  }
};
