"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize; // Import DataTypes from Sequelize

    await queryInterface.createTable("habitaciones", {
      id_habitacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      numero_habitacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cantidad_camas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 2,
        },
      },
      id_ala: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "alas",
          key: "id_ala",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("habitaciones");
  },
};
