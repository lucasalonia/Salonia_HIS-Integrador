const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");

class Medico extends Model {
  static associate(models) {
    
    Medico.hasMany(models.Derivacion, { foreignKey: 'id_medico' });
  }

  static async crearMedico(medicoData) {
    try {
      const nuevoMedico = await this.create(medicoData);
      return nuevoMedico;
    } catch (error) {
      console.error("Error al crear el médico:", error);
      throw error;
    }
  }

  static async listarMedicos() {
    return await Medico.findAll();
  }
  static async buscarMedicoPorId(id_medico) {
    return await Medico.findOne({ where: { id_medico } });
  }
  
}

Medico.init(
  {
    id_medico: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    especialidad: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Medico",
    tableName: "medicos",
    timestamps: false
  }
);

module.exports = Medico;
