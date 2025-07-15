const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Medicamentos extends Model {
  static associate(models) {
    Alergias.belongsToMany(models.Paciente, {
      through: models.HistorialAlergias,
      foreignKey: "id_alergia",
    });
  }
  static async listarMedicamentos() {
    const medicacion = await Medicamentos.findAll();
    return medicacion;
  }
}

Medicamentos.init(
  {
    id_medicamentos: {
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
