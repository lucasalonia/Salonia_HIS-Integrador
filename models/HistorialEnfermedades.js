const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class HistorialEnfermedades extends Model {}

HistorialEnfermedades.init({
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_enfermedad: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'HistorialEnfermedades',
  tableName: 'historial_enfermedades',
  timestamps: false
});

module.exports = HistorialEnfermedades;