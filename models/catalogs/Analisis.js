const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Analisis extends Model {
  static associate(models) {
    Analisis.belongsToMany(models.Paciente, {
      through: models.PacienteAnalisis,
      foreignKey: "id_analisis",
    });
  }
  static async listarAnalisis() {
    const analisis = await Analisis.findAll();
    return analisis;
  }
}

Analisis.init(
  {
    id_analisis: {
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
    modelName: "Analisis",
    tableName: "analisis",
    timestamps: false,
  }
);

module.exports = Analisis;
