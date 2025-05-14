const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");
const Ala = require("./Ala.js");

class Habitacion extends Model {
    
}

Habitacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    numero_habitacion: {
      type: DataTypes.INTEGER,
      allowNull: false, 
    },
    cantidad_camas: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1, 
        max: 2, 
      },
    },
    idAla: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ala, 
        key: "id", 
      },
    },
  },
  {
    sequelize,
    modelName: "Habitacion",
    tableName: "habitaciones", 
    timestamps: false, 
  }
);


//RELACIONES
Habitacion.belongsTo(Ala, { foreignKey: 'idAla' });

module.exports = Habitacion;