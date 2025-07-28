const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Medicamentos extends Model {
  static associate(models) {
    Medicamentos.belongsToMany(models.Paciente, {
      through: models.HistorialMedicamentos,
      foreignKey: "id_medicamento",
    });
    Medicamentos.belongsToMany(models.Paciente, {
      through: models.PlanMedicamentos,
      foreignKey: "id_medicamento",
    });
    Medicamentos.belongsToMany(models.Paciente, {
      through: models.PacienteMedicamentos,
      foreignKey: "id_medicamento",
    });
    
  }
  static async listarMedicamentos() {
    const medicacion = await Medicamentos.findAll();
    return medicacion;
  }
}

Medicamentos.init(
  {
    id_medicamento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Medicamentos",
    tableName: "medicamentos",
    timestamps: false,
  }
);

module.exports = Medicamentos;
