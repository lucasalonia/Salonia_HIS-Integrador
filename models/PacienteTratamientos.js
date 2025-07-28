const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class PacienteTratamientos extends Model {
  static async crearPacienteTratamientos(id_paciente, tratamientos = [], options = {}) {
    if (!tratamientos || tratamientos.length === 0) {
      return;
    }

    const registros = tratamientos.map((id_tratamiento) => ({
      id_paciente: id_paciente,
      id_tratamiento: id_tratamiento,
    }));

    await PacienteTratamientos.bulkCreate(registros, { ...options, ignoreDuplicates: true });
  }
}

PacienteTratamientos.init({
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_tratamiento: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'PacienteTratamientos',
  tableName: 'paciente_tratamientos',
  timestamps: false,
});

module.exports = PacienteTratamientos;
