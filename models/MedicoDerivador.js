const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");
const Paciente = require("./Paciente.js");
const Medico = require("./Medico.js");

class MedicoDerivador extends Model {
  static associate(models) {
    MedicoDerivador.belongsTo(models.Paciente, { foreignKey: 'id_paciente' });
    MedicoDerivador.belongsTo(models.Medico, { foreignKey: 'id_medico' });
  }

  static async crearDerivacion(data) {
    try {
      const derivacion = await this.create(data);
      return derivacion;
    } catch (error) {
      console.error("Error al crear la derivación:", error);
      throw error;
    }
  }

  static async listarDerivaciones() {
    return await MedicoDerivador.findAll({
      include: [Paciente, Medico]
    });
  }
}

MedicoDerivador.init(
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
    modelName: "MedicoDerivador",
    tableName: "medicos_derivadores",
    timestamps: false
  }
);

module.exports = MedicoDerivador;
