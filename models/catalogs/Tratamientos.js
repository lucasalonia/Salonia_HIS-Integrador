const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Tratamientos extends Model {
  static associate(models) {
    Tratamientos.belongsToMany(models.Paciente, {
      through: models.PacienteTratamientos,
      foreignKey: "id_tratamiento",
    });
  }

  static async listarTratamientos() {
    const tratamientos = await Tratamientos.findAll();
    return tratamientos;
  }
}

Tratamientos.init(
  {
    id_tratamiento: {
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
    modelName: "Tratamientos",
    tableName: "tratamientos",
    timestamps: false,
  }
);

module.exports = Tratamientos;
