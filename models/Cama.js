const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");
const Habitacion = require("./Habitacion.js");
const Paciente = require("./Paciente.js");

class Cama extends Model {
  static associate(models) {
    Cama.belongsTo(models.Habitacion, { foreignKey: "id_habitacion" });
    Cama.belongsTo(models.Paciente, {
      foreignKey: "dni",
      allowNull: true,
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  }

  static async listarCamasPorHabitacion(id_habitacion) {
    const camas = await Cama.findAll({
      where: {
        id_habitacion: id_habitacion,
        higienizada: true,
        liberada: true,
      },
    });
    return camas;
  }

  static async actualizarDniCama(id_cama, nuevoDni) {
    const cama = await Cama.findByPk(id_cama);
    if (!cama) {
      throw new Error("Cama no encontrada");
    }

    cama.dni = nuevoDni; 
    await cama.save(); 

    return cama;
  }
}

Cama.init(
  {
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
    id_habitacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Habitacion,
        key: "id_habitacion",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Paciente,
        key: "dni",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "Cama",
    tableName: "camas",
    timestamps: false,
  }
);

module.exports = Cama;
