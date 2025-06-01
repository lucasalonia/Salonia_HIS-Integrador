const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");
const Habitacion = require("./Habitacion.js");


class Cama extends Model {
  static associate(models) {
    Cama.belongsTo(models.Habitacion, { foreignKey: "id_habitacion" });
    Cama.hasMany(models.Internacion, { foreignKey: 'id_cama' });
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

  static async listarCamasLiberadas(){
    const camas = await this.findAll({
      where: {
        liberada: true,
        higienizada: true,
      },
      order: [['numero_cama', 'ASC']],
    });
    return camas;
  }

  static async actualizarEstadoCama(id_cama, nuevoEstado,options = {}) {
  const cama = await Cama.findByPk(id_cama);
  if (!cama) {
    throw new Error("Cama no encontrada");
  }

  if (nuevoEstado.hasOwnProperty('liberada')) {
    cama.liberada = nuevoEstado.liberada;
  }

  await cama.save(options);
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
  },
  {
    sequelize,
    modelName: "Cama",
    tableName: "camas",
    timestamps: false,
  }
);

module.exports = Cama;
