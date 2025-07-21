
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

class PlanMedicamentos extends Model {
  static async crearPlanMedicamentos(id_paciente, medicamentos = [], options = {}) {
    if (!medicamentos || medicamentos.length === 0) {
      return;
    }

    const registros = medicamentos.map((idMedicamento) => ({
      id_paciente: id_paciente,
      id_medicamento: idMedicamento,
    }));

    await PlanMedicamentos.bulkCreate(registros, {...options, ignoreDuplicates: true});
  }
}

PlanMedicamentos.init({
  id_paciente: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_medicamento: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
}, {
  sequelize,
  modelName: 'PlanMedicamentos',
  tableName: 'plan_medicamentos',
  timestamps: false
});

module.exports = PlanMedicamentos;
