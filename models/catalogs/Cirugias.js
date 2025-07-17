const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Cirugias extends Model {
  static associate(models) {
    Cirugias.belongsToMany(models.Paciente, {
      through: models.HistorialCirugias,
      foreignKey: "id_cirugia",
    });
  }
  static async listarCirugias() {
    const cirugias = await Cirugias.findAll();
    return cirugias;
  }
 
  
}

Cirugias.init(
  {
    id_cirugia: {
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
    modelName: "Cirugias",
    tableName: "cirugias",
    timestamps: false,
  }
);

module.exports = Cirugias;
