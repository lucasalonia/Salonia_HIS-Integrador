
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class HistorialMedicamentos extends Model {}

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
