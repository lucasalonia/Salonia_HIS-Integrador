const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Ocupacionales extends Model {
  static associate(models) {
    Ocupacionales.belongsToMany(models.Paciente, {
      through: models.PacienteOcupacionales,
      foreignKey: "id_ocupacional",
      as: "pacientesOcupacionales",
    });
  }

  static async listarOcupacionales() {
    const ocupacionales = await Ocupacionales.findAll();
    return ocupacionales;
  }
}

Ocupacionales.init(
  {
    id_ocupacional: {
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
    modelName: "Ocupacionales",
    tableName: "ocupacionales",
    timestamps: false,
  }
);

module.exports = Ocupacionales;
