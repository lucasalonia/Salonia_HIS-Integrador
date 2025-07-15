const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Antecedentes extends Model {
  static associate(models) {
    Alergias.belongsToMany(models.Paciente, {
      through: models.HistorialAlergias,
      foreignKey: "id_alergia",
    });
  }
  static async listarAntecedentes() {
    const antecedentes = await Antecedentes.findAll();
    return antecedentes;
  }
 
  
}

Antecedentes.init(
  {
    id_antecedentes: {
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
    modelName: "Antecedentes",
    tableName: "antecedentes",
    timestamps: false,
  }
);

module.exports = Antecedentes;
