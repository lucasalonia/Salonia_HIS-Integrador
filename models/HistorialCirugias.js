
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class HistorialCirugias extends Model {}

HistorialCirugias.init({
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_cirugia: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'HistorialCirugias',
  tableName: 'historial_cirugias',
  timestamps: false
});

module.exports = HistorialCirugias;
