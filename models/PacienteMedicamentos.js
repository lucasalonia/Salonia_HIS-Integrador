const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

class PacienteMedicamentos extends Model {
 static async crearPacienteMedicamentos(id_paciente, medicamentos = [], options = {}) {
  if (!medicamentos || medicamentos.length === 0) return;

  const registros = medicamentos.map(({ id_medicamento, dosis, duracion }) => ({
    id_paciente,
    id_medicamento,
    dosis,
    duracion,
  }));

  await PacienteMedicamentos.bulkCreate(registros, {
    ...options,
    ignoreDuplicates: true,
  });
}
}

PacienteMedicamentos.init(
  {
    id_paciente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    id_medicamento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    dosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duracion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "PacienteMedicamentos",
    tableName: "paciente_medicamentos",
    timestamps: false,
  }
);

module.exports = PacienteMedicamentos;
