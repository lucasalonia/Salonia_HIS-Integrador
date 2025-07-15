const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../../config/db.js");

class Cirugias extends Model {
  static associate(models) {
    Alergias.belongsToMany(models.Paciente, {
      through: models.HistorialAlergias,
      foreignKey: "id_alergia",
    });
  }
  static async listarCirugias() {
    const cirugias = await Cirugias.findAll();
    return cirugias;
  }
 
  
}

Cirugias.init(
  {
    id_cirugias: {
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
