const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");
const Paciente = require("./Paciente.js");
const Medico = require("./Medico.js");

class Derivacion extends Model {
  static associate(models) {
    Derivacion.belongsTo(models.Paciente, { foreignKey: 'id_paciente' });
    Derivacion.belongsTo(models.Medico, { foreignKey: 'id_medico' });
  }

  static async crearDerivacion(data, options = {}) {
    try {
      const derivacion = await this.create(data, options);
      return derivacion;
    } catch (error) {
      console.error("Error al crear la derivación:", error);
      throw error;
    }
  }

  static async listarDerivaciones() {
    return await Derivacion.findAll();
  }
  static async buscarDerivacionPorIdPaciente(id_paciente) {
    return await Derivacion.findOne({ where: { id_paciente } });
  }
}

Derivacion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Paciente,
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    },
    id_medico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Medico,
        key: "id_medico"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    }
  },
  {
    sequelize,
    modelName: "Derivacion",
    tableName: "derivaciones",
    timestamps: false
  }
);

module.exports = Derivacion;
