const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");
const Paciente = require("./Paciente.js");

class ObraSocial extends Model {
  static associate(models) {
    ObraSocial.belongsTo(models.Paciente, { foreignKey: 'id_paciente' });
  }

  static async crearObraSocial(obraSocialData,options = {}) {
    try {
      const nuevaObra = await this.create(obraSocialData, options  );
      return nuevaObra;
    } catch (error) {
      console.error("Error al crear la obra social:", error);
      throw error;
    }
  }

  static async listarObrasSociales() {
    return await ObraSocial.findAll();
  }
  static async buscarObraSocialPorIdPaciente(id_paciente) {
    return await ObraSocial.findOne({ where: { id_paciente } });
  }


static async buscarObraSocialPorIdPaciente(id_paciente,options = {}) {
  return await this.findOne({ where: { id_paciente },...options });
}
}

ObraSocial.init(
  {
    id_obra_social: {
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
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "ObraSocial",
    tableName: "obras_sociales",
    timestamps: false
  }
);

module.exports = ObraSocial;
