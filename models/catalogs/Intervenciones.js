const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); 

class Intervencion extends Model {
     static async listarIntervenciones() {
    try {
      const intervenciones = await Intervencion.findAll();
      return intervenciones;
    } catch (error) {
      console.error("Error al obtener las intervenciones:", error);
      throw error;
    }
  }
}

Intervencion.init(
  {
    id_intervenciones: {
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
    modelName: 'Intervencion',
    tableName: 'intervenciones',
    timestamps: false 
  }
);

module.exports = Intervencion;
