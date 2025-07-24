const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

class PacienteAnalisis extends Model {
  static async crearPacienteAnalisis(id_paciente, analisis = [], options = {}) {
    if (!analisis || analisis.length === 0) {
      return;
    }

    const registros = analisis.map((iDanalisis) => ({
      id_paciente: id_paciente,
      id_analisis: iDanalisis,
    }));

    await PacienteAnalisis.bulkCreate(registros, {
      ...options,
      ignoreDuplicates: true,
    });
  }
}

PacienteAnalisis.init(
  {
    id_paciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_analisis: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "PacienteAnalisis",
    tableName: "paciente_analisis",
    timestamps: false,
  }
);

module.exports = PacienteAnalisis;
