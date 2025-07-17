
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class HistorialMedicamentos extends Model {
  static async crearHistorialMedicamento(id_paciente, medicamentos = [], options = {}) {
    if (!medicamentos || medicamentos.length === 0) {
      return;
    }

    const registros = medicamentos.map((idMedicamento) => ({
      id_paciente: id_paciente,
      id_medicamento: idMedicamento,
    }));

    await HistorialMedicamentos.bulkCreate(registros, {...options, ignoreDuplicates: true});
  }
}

HistorialMedicamentos.init({
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_medicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'HistorialMedicamentos',
  tableName: 'historial_medicamentos',
  timestamps: false
});

module.exports = HistorialMedicamentos;
