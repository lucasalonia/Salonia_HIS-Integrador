const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class HistorialEnfermedades extends Model {

  static async crearHistorialEnfermedad(id_paciente, enfermedades = [], options = {}) {
    if (!enfermedades || enfermedades.length === 0) {
      return;
    }

    const registros = enfermedades.map((idEnfermedad) => ({
      id_paciente: id_paciente,
      id_enfermedad: idEnfermedad,
    }));

    await HistorialEnfermedades.bulkCreate(registros, {...options, ignoreDuplicates: true});
  }

}

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