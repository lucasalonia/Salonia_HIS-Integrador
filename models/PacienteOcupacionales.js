const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class PacienteOcupacionales extends Model {
  static async crearPacienteOcupacionales(id_paciente, ocupacionales = [], options = {}) {
    if (!ocupacionales || ocupacionales.length === 0) {
      return;
    }

    const registros = ocupacionales.map((id_ocupacional) => ({
      id_paciente: id_paciente,
      id_ocupacional: id_ocupacional,
    }));

    await PacienteOcupacionales.bulkCreate(registros, { ...options, ignoreDuplicates: true });
  }
}

PacienteOcupacionales.init({
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_ocupacional: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'PacienteOcupacionales',
  tableName: 'paciente_ocupacionales',
  timestamps: false,
});

module.exports = PacienteOcupacionales;
