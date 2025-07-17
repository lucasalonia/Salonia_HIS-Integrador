
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class HistorialAntecedentes extends Model {
  static async crearHistorialAntecedente(id_paciente, antecedentes = [], options = {}) {
    if (!antecedentes || antecedentes.length === 0) {
      return;
    }

    const registros = antecedentes.map((idAntecedente) => ({
      id_paciente: id_paciente,
      id_antecedente: idAntecedente,
    }));

    await HistorialAntecedentes.bulkCreate(registros, {...options, ignoreDuplicates: true});
  }
}

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
