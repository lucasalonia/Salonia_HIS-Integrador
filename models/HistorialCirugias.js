
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class HistorialCirugias extends Model {

  static async crearHistorialCirugia(id_paciente, cirugias = [], options = {}) {
    if (!cirugias || cirugias.length === 0) {
      return;
    }

    const registros = cirugias.map((idCirugia) => ({
      id_paciente: id_paciente,
      id_cirugia: idCirugia,
    }));

    await HistorialCirugias.bulkCreate(registros, {...options, ignoreDuplicates: true});
  }

}

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
