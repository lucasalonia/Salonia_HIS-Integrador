const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Enfermedades extends Model {
  static associate(models) {
    Enfermedades.belongsToMany(models.Paciente, {
      through: models.HistorialEnfermedades,
      foreignKey: "id_enfermedad",
    });
  }
  static async listarEnfermedades() {
    const enfermedades = await Enfermedades.findAll();
    return enfermedades;
  }
 
  
}

Enfermedades.init(
  {
    id_enfermedad: {
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
    modelName: "Enfermedades",
    tableName: "enfermedades",
    timestamps: false,
  }
);

module.exports = Enfermedades;
