const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");
const Cama = require("./Cama.js");
const Paciente = require("./Paciente.js");

class Internacion extends Model {
  static associate(models) {
    Internacion.belongsTo(models.Paciente, { foreignKey: "id_paciente" });
    Internacion.belongsTo(models.Cama, { foreignKey: "id_cama" });
  }
  static async crearInternacion(internacionData, options = {} ) {
    try {
      const nuevaInternacion = await this.create(internacionData, options);
      return nuevaInternacion;
    } catch (error) {
      console.error("Error al crear internacion:", error);
      throw error;
    }
  }
  static async listarInternaciones() {
    return await Internacion.findAll();
  }
  static async buscarInternacionPorIdPaciente(id_paciente ) {
    try {
      const internacion = await Internacion.findOne({
        where: { id_paciente },
      });
      return internacion;
    } catch (error) {
      console.error("Error al buscar la internación por ID:", error);
      throw error;
    }
  }

static async darAlta(id_paciente, options = {}) {
  try {
    const internacion = await Internacion.findOne({ where: { id_paciente } });

    if (!internacion) {
      throw new Error("Internación no encontrada");
    }

    await internacion.update({ internado: false, fecha_egreso: new Date() }, options);

    return { mensaje: "Internación actualizada correctamente" };
  } catch (error) {
    console.error("Error al actualizar la internación:", error);
    throw error;
  }
}
 
}

Internacion.init(
  {
    id_internacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Paciente,
        key: "id_paciente",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_cama: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cama,
        key: "id_cama",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    internado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    hora_ingreso: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIME"),
    },
  },
  {
    sequelize,
    modelName: "Internacion",
    tableName: "internaciones",
    timestamps: false,
  }
);

module.exports = Internacion;
