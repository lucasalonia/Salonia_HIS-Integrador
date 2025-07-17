const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

class HistorialAlergias extends Model {

  static async crearHistorialAlergia(id_paciente, alergias = [], options = {}) {
    if (!alergias || alergias.length === 0) {
      return;
    }

    const registros = alergias.map((idAlergia) => ({
      id_paciente: id_paciente,
      id_alergia: idAlergia,
    }));

    await HistorialAlergias.bulkCreate(registros, {...options, ignoreDuplicates: true});
  }
}

HistorialAlergias.init(
  {
    id_paciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_alergia: {
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
    modelName: "HistorialAlergias",
    tableName: "historial_alergias",
    timestamps: false,
  }
);

module.exports = HistorialAlergias;
