const { Model, DataTypes } = require('sequelize');
const { sequelize } = require("../../config/db.js");

class Intervenciones extends Model {

    static associate(models) {
    Intervenciones.belongsToMany(models.Paciente, {
      through: models.PlanIntervenciones,
      foreignKey: "id_intervencion",
      as:"intervencionesPaciente",
    });
  }


     static async listarIntervenciones() {
    try {
      const intervenciones = await Intervenciones.findAll();
      return intervenciones;
    } catch (error) {
      console.error("Error al obtener las intervenciones:", error);
      throw error;
    }
  }
}

Intervenciones.init(
  {
    id_intervencion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Intervenciones',
    tableName: 'intervenciones',
    timestamps: false 
  }
);

module.exports = Intervenciones;
