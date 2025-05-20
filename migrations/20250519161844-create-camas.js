"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;

    await queryInterface.createTable("camas", {
      id_cama: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      numero_cama: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      id_habitacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "habitaciones",
          key: "id_habitacion",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      dni: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "pacientes",
          key: "dni",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      liberada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      higienizada: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("camas");
  },
};
