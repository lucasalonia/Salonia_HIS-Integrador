
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class HistorialAntecedentes extends Model {}

HistorialAntecedentes.init({
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_antecedente: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'HistorialAntecedentes',
  tableName: 'historial_antecedentes',
  timestamps: false
});

module.exports = HistorialAntecedentes;
