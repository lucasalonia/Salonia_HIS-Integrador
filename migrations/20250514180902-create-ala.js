'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;  // Import DataTypes from Sequelize

    await queryInterface.createTable('alas', {
      id_ala: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('alas');
  }
};