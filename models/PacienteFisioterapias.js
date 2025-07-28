const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class PacienteFisioterapias extends Model {
  static async crearPacienteFisioterapias(id_paciente, fisioterapias = [], options = {}) {
    if (!fisioterapias || fisioterapias.length === 0) {
      return;
    }

    const registros = fisioterapias.map((id_fisioterapia) => ({
      id_paciente: id_paciente,
      id_fisioterapia: id_fisioterapia,
    }));

    await PacienteFisioterapias.bulkCreate(registros, { ...options, ignoreDuplicates: true });
  }
}

PacienteFisioterapias.init({
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_fisioterapia: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'PacienteFisioterapias',
  tableName: 'paciente_fisioterapias',
  timestamps: false,
});

module.exports = PacienteFisioterapias;
