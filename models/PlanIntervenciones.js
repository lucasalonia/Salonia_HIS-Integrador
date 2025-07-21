
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class PlanIntervenciones extends Model {
  static async crearPlanIntervencion(id_paciente, intervenciones = [], options = {}) {
    if (!intervenciones || intervenciones.length === 0) {
      return;
    }

    const registros = intervenciones.map((idIntervencion) => ({
      id_paciente: id_paciente,
      id_intervencion: idIntervencion,
    }));

    await PlanIntervenciones.bulkCreate(registros, {...options, ignoreDuplicates: true});
  }
}

PlanIntervenciones.init({
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_intervencion: {
    type: DataTypes.INTEGER,
    primaryKey: true
  }
}, {
  sequelize,
  modelName: 'PlanIntervenciones',
  tableName: 'plan_intervenciones',
  timestamps: false
});

module.exports = PlanIntervenciones;
