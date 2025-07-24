const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Radiografias extends Model {
  static associate(models) {
    Radiografias.belongsToMany(models.Paciente, {
      through: models.PacienteRadiografia,
      foreignKey: "id_radiografia",
    });
  }
  static async listarRadiografias() {
    const radiografias = await Radiografias.findAll();
    return radiografias;
  }
}

Radiografias.init(
  {
    id_radiografia: {
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
    modelName: "Radiografias",
    tableName: "radiografias",
    timestamps: false,
  }
);

module.exports = Radiografias;
