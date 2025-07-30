const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Resonancias extends Model {
  static associate(models) {
    Resonancias.belongsToMany(models.Paciente, {
      through: models.PacienteResonancia,
      foreignKey: "id_resonancia",
      as: "pacientesResonancias",
    });
  }
  static async listarResonancias() {
    const resonancias = await Resonancias.findAll();
    return resonancias;
  }
}

Resonancias.init(
  {
    id_resonancia: {
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
    modelName: "Resonancias",
    tableName: "resonancias",
    timestamps: false,
  }
);

module.exports = Resonancias;
