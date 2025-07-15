const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Alergias extends Model {
  static associate(models) {
    Alergias.belongsToMany(models.Paciente, {
      through: models.HistorialAlergias,
      foreignKey: "id_alergia",
    });
  }
  static async listarAlergias() {
    const alergias = await Alergias.findAll();
    return alergias;
  }
}

Alergias.init(
  {
    id_alergia: {
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
    modelName: "Alergias",
    tableName: "alergias",
    timestamps: false,
  }
);

module.exports = Alergias;
