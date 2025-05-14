const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");
const Habitacion = require("./Habitacion.js");
const Ala = require("./Ala.js");

class Cama extends Model {

}

Cama.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    numero_cama: {
      type: DataTypes.INTEGER,
      allowNull: false, 
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
    modelName: "Cama",
    tableName: "camas", 
    timestamps: false, 
  }
);


//RELACIONES
Cama.belongsTo(Ala, { foreignKey: 'idAla' });
Cama.belongsTo(Habitacion, { foreignKey: 'idAla' });


//HOOK PARA EL CONTROL DE CAMAS SEGUN CAPACIDAD DE LA HABITACION    
Cama.addHook('beforeCreate', async (cama, options) => {
  const habitacion = await Habitacion.findByPk(cama.idHabitacion);
  if (!habitacion) {
    throw new Error("La habitación asignada no existe.");
  }

  const camasRegistradas = await Cama.count({
    where: { idHabitacion: cama.idHabitacion }
  });

  if (camasRegistradas >= habitacion.cantidad_camas) {
    throw new Error("La habitación ya alcanzó su capacidad máxima de camas.");
  }
});

module.exports = Cama;