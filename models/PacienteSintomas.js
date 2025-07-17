
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class PacienteSintomas extends Model {
    static async crearPacienteSintomas(id_paciente, sintomas = [], options = {}) {
    if (!sintomas || sintomas.length === 0) {
      return;
    }

    const registros = sintomas.map((idSintoma) => ({
      id_paciente: id_paciente,
      id_sintoma: idSintoma,
    }));

    await PacienteSintomas.bulkCreate(registros, {...options, ignoreDuplicates: true});
  }
}

PacienteSintomas.init({
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_sintoma: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'PacienteSintomas',
  tableName: 'Paciente_sintomas',
  timestamps: false
});

module.exports = PacienteSintomas;
