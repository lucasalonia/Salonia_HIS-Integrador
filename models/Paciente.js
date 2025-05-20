const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");


class Paciente extends Model {

  static async crearPaciente(pacienteData) {
    try {
      const nuevoPaciente = await this.create(pacienteData);
      return nuevoPaciente;
    } catch (error) {
      console.error("Error al crear el paciente:", error);
      throw error;
    }
  }

  static async listarPacientes() {
    const pacientes = await Paciente.findAll();
    return pacientes;
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
    medico_derivador: {
      type: DataTypes.STRING,
      allowNull: false,
     
    },
    obra_social: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_obra_social: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    internado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
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


