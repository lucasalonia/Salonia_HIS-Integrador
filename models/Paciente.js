const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");

class Paciente extends Model {
  static associate(models) {
    Paciente.hasMany(models.Internacion, { foreignKey: "id_paciente" });
    Paciente.hasOne(ObraSocial, { foreignKey: "id_paciente" });
    Paciente.hasMany(models.Derivacion, { foreignKey: "id_paciente" });
  }

  static async crearPaciente(pacienteData, options = {}) {
    try {
      const nuevoPaciente = await this.create(pacienteData, options);
      return nuevoPaciente;
    } catch (error) {
      console.error("Error al crear el paciente:", error);
      throw error;
    }
  }
  static async actualizarPacientePorDni(dni, nuevosDatos, options = {}) {
    try {
      const [actualizados] = await this.update(nuevosDatos, {
        where: { dni },
        ...options,
      });
      if (actualizados === 0) {
        throw new Error("No se encontró el paciente para actualizar.");
      }
      return await this.findOne({ where: { dni } });
    } catch (error) {
      console.error("Error al actualizar el paciente:", error);
      throw error;
    }
  }

  static async listarPacientes() {
    const pacientes = await Paciente.findAll();
    return pacientes;
  }

  static async buscarPacientePorDni(dni, options = {}) {
    try {
      const paciente = await Paciente.findOne({
        where: { dni }, ...options
      });
      return paciente;
    } catch (error) {
      console.error("Error al buscar el paciente por DNI:", error);
      throw error;
    }
  }
}

Paciente.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    numero_emergencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medios_ingreso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    borradoLogico: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Paciente",
    tableName: "pacientes",
    timestamps: false,
  }
);

module.exports = Paciente;
