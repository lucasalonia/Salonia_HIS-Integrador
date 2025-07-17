const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Sintomas extends Model {
  static associate(models) {
    Sintomas.belongsToMany(models.Paciente, {
      through: models.PacienteSintomas,
      foreignKey: "id_sintoma",
    });
  }
  static async listarSintomas() {
    const sintomas = await Sintomas.findAll();
    return sintomas;
  }
 
  
}

Sintomas.init(
  {
    id_sintoma: {
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
    modelName: "Sintomas",
    tableName: "sintomas",
    timestamps: false,
  }
);

module.exports = Sintomas;
