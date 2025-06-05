const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");


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

   static async actualizarEstadoCamaPorId(id_cama, options = {}) {
     try {
      const cama = await Cama.findByPk(id_cama);
      if (!cama) {
        throw new Error("cama no encontrada");
      }
      await cama.update({ liberada: true },options);
      return { mensaje: "Cama eliminad correctamente" };
    } catch (error) {
      console.error("Error al eliminar la cama:", error);
      throw error;
    }
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

  static async buscarCamaPorId(id_cama) {
    const cama = await Cama.findByPk(id_cama);
    if (!cama) {
      throw new Error("Cama no encontrada");
    }
    return cama;
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
static async listarCamasOcupadas(){
  return await Cama.findAll();
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
        model: "habitaciones",
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
