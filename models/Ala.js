const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");
const Habitacion = require("./Habitacion.js");
class Ala extends Model {
    static associate(models) {
      Ala.hasMany(models.Habitacion, { foreignKey: 'id_ala' });
    }

   static async listarAlas() {
    const alas = await Ala.findAll();
    return alas;
  }

}
Ala.init(
  {
    id_ala: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
  },
  {
    sequelize,
    modelName: "Ala",
    tableName: "alas", 
    timestamps: false, 
  }
);

//RELACIONES


module.exports = Ala;

