const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Fisioterapias extends Model {
  static associate(models) {
    Fisioterapias.belongsToMany(models.Paciente, {
      through: models.PacienteFisioterapias,
      foreignKey: "id_fisioterapia",
    });
  }

  static async listarFisioterapias() {
    const fisioterapias = await Fisioterapias.findAll();
    return fisioterapias;
  }
}

Fisioterapias.init(
  {
    id_fisioterapia: {
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
    modelName: "Fisioterapias",
    tableName: "fisioterapias",
    timestamps: false,
  }
);

module.exports = Fisioterapias;
