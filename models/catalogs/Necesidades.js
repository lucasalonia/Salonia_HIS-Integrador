const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Necesidades extends Model {
  static associate(models) {
    Necesidades.belongsToMany(models.Paciente, {
      through: models.PacienteNecesidades,
      foreignKey: "id_necesidad",
    });
  }
  static async listarNecesidades() {
    const necesidades = await Necesidades.findAll();
    return necesidades;
  }
 
  
}

Necesidades.init(
  {
    id_necesidad: {
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
    modelName: "Necesidades",
    tableName: "necesidades",
    timestamps: false,
  }
);

module.exports = Necesidades;
