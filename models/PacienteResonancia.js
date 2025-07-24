const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

class PacienteResonancia extends Model {
  static async crearPacienteResonancia(
    id_paciente,
    resonancias = [],
    options = {}
  ) {
    if (!resonancias || resonancias.length === 0) {
      return;
    }

    const registros = resonancias.map((iDresonancias) => ({
      id_paciente: id_paciente,
      id_resonancia: iDresonancias,
    }));

    await PacienteResonancia.bulkCreate(registros, {
      ...options,
      ignoreDuplicates: true,
    });
  }
}

PacienteResonancia.init(
  {
    id_paciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_resonancia: {
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
    modelName: "PacienteResonancia",
    tableName: "paciente_resonancia",
    timestamps: false,
  }
);

module.exports = PacienteResonancia;
