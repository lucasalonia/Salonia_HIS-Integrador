const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");

class Ala extends Model {

}
Ala.init(
  {
    id: {
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
Ala.hasMany(Habitacion, { foreignKey: 'idAla' });

module.exports = Ala;

