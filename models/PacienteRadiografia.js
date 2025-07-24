const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

class PacienteRadiografia extends Model {
  static async crearPacienteRadiografia(
    id_paciente,
    radiografias = [],
    options = {}
  ) {
    if (!radiografias || radiografias.length === 0) {
      return;
    }

    const registros = radiografias.map((iDradiografia) => ({
      id_paciente: id_paciente,
      id_radiografia: iDradiografia,
    }));
    
    await PacienteRadiografia.bulkCreate(registros, {
      ...options,
      ignoreDuplicates: true,
    });
  }
}

PacienteRadiografia.init(
  {
    id_paciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_radiografia: {
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
    modelName: "PacienteRadiografia",
    tableName: "paciente_radiografia",
    timestamps: false,
  }
);

module.exports = PacienteRadiografia;
