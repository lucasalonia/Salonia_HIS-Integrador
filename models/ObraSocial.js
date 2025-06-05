const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");

class ObraSocial extends Model {
  static associate(models) {
    ObraSocial.belongsTo(models.Paciente, { foreignKey: "id_paciente" });
  }

  static async crearObraSocial(obraSocialData, options = {}) {
    try {
      const nuevaObra = await this.create(obraSocialData, options);
      return nuevaObra;
    } catch (error) {
      console.error("Error al crear la obra social:", error);
      throw error;
    }
  }

  static async listarObrasSociales() {
    return await ObraSocial.findAll();
  }
  static async actualizarObraSocialPorIdPaciente(
    id_paciente,
    nuevosDatos,
    options = {}
  ) {
    try {
      const obraSocial = await this.findOne({
        where: { id_paciente },
        ...options,
      });
      if (!obraSocial) {
        throw new Error("No se encontró la obra social para actualizar.");
      }

      let cambio = false;
      for (const key in nuevosDatos) {
        if (obraSocial[key] !== nuevosDatos[key]) {
          obraSocial[key] = nuevosDatos[key];
          cambio = true;
        }
      }

      if (!cambio) {
        console.log("No hubo cambios en los datos.");
        return obraSocial;
      }

      await obraSocial.save(options);
      return obraSocial;
    } catch (error) {
      console.error("Error al actualizar la obra social:", error);
      throw error;
    }
  }

  static async buscarObraSocialPorIdPaciente(id_paciente) {
    return await this.findOne({ where: { id_paciente } });
  }
}

ObraSocial.init(
  {
    id_obra_social: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "pacientes",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ObraSocial",
    tableName: "obras_sociales",
    timestamps: false,
  }
);

module.exports = ObraSocial;
