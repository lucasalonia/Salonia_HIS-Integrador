const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");
const Ala = require("./Ala.js");

class Habitacion extends Model {

  static associate(models) {
      Habitacion.belongsTo(models.Ala, { foreignKey: 'id_ala' });
      Habitacion.hasMany(models.Cama, { foreignKey: 'id_habitacion' });
    }

   static async listarHabitacionesPorAla(id_ala) {
  const habitaciones = await Habitacion.findAll({
    where: {
      id_ala: id_ala 
    }
  });
  return habitaciones;
}
}

Habitacion.init(
  {
    id_habitacion: {
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
    id_ala: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Ala, 
        key: "id_ala", 
      },
       onUpdate: "CASCADE",
        onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Habitacion",
    tableName: "habitaciones", 
    timestamps: false, 
  }
);



module.exports = Habitacion;