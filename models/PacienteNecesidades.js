
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class PacienteNecesidades extends Model {
  static async crearPacienteNecesidades(id_paciente, necesidades = [], options = {}) {
    if (!necesidades || necesidades.length === 0) {
      return;
    }

    const registros = necesidades.map((idNecesidad) => ({
      id_paciente: id_paciente,
      id_necesidad: idNecesidad,
    }));

    await PacienteNecesidades.bulkCreate(registros, {...options, ignoreDuplicates: true});
  }
}

PacienteNecesidades.init({
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_necesidad: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'PacienteNecesidades',
  tableName: 'paciente_necesidades',
  timestamps: false
});

module.exports = PacienteNecesidades;
