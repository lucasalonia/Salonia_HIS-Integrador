const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");

class Paciente extends Model {
  static associate(models) {
    Paciente.hasMany(models.Internacion, { foreignKey: "id_paciente" });
    Paciente.hasOne(models.ObraSocial, { foreignKey: "id_paciente" });
    Paciente.hasMany(models.Derivacion, { foreignKey: "id_paciente" });

    Paciente.belongsToMany(models.Alergias, {
      through: models.HistorialAlergias,
      foreignKey: "id_paciente",
    });
    Paciente.belongsToMany(models.Antecedentes, {
      through: models.HistorialAntecedentes,
      foreignKey: "id_paciente",
    });
    Paciente.belongsToMany(models.Cirugias, {
      through: models.HistorialCirugias,
      foreignKey: "id_paciente",
    });
    Paciente.belongsToMany(models.Enfermedades, {
      through: models.HistorialEnfermedades,
      foreignKey: "id_paciente",
    });
    Paciente.belongsToMany(models.Medicamentos, {
      through: models.HistorialMedicamentos,
      foreignKey: "id_paciente",
    });
    Paciente.belongsToMany(models.Medicamentos, {
      through: models.PlanMedicamentos,
      foreignKey: "id_paciente",
    });

    Paciente.belongsToMany(models.Sintomas, {
      through: models.PacienteSintomas,
      foreignKey: "id_paciente",
    });

    Paciente.belongsToMany(models.Necesidades, {
      through: models.PacienteNecesidades,
      foreignKey: "id_paciente",
    });
    Paciente.hasMany(models.EvaluacionBasica, {
      foreignKey: "id_paciente",
      as: "evaluaciones",
    });

    Paciente.belongsToMany(models.Intervenciones, {
      through: models.PlanIntervenciones,
      foreignKey: "id_paciente",
    });

    Paciente.hasOne(models.PlanTratamiento, {
      foreignKey: "id_paciente",
      as: "tratamiento",
    });
    Paciente.belongsToMany(models.Radiografias, {
      through: models.PacienteRadiografia,
      foreignKey: "id_paciente",
    });
    Paciente.belongsToMany(models.Resonancias, {
      through: models.PacienteResonancia,
      foreignKey: "id_paciente",
    });
    Paciente.belongsToMany(models.Analisis, {
      through: models.PacienteAnalisis,
      foreignKey: "id_paciente",
    });
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

  static async buscarPacientePorDni(dni) {
    try {
      const paciente = await Paciente.findOne({
        where: { dni },
        borradoLogico: true,
      });
      return paciente;
    } catch (error) {
      console.error("Error al buscar el paciente por DNI:", error);
      throw error;
    }
  }

  static async buscarUltimoPacienteNN() {
    try {
      const ultimoNN = await this.findOne({
        where: { es_nn: true },
        order: [["id", "DESC"]],
      });

      return ultimoNN;
    } catch (error) {
      console.error("Error al buscar el último paciente NN:", error);
      throw error;
    }
  }

  static async borrarLogicoPaciente(id, options = {}) {
    try {
      const paciente = await Paciente.findByPk(id);
      if (!paciente) {
        throw new Error("Paciente no encontrado");
      }
      await paciente.update({ borradoLogico: false }, options);
      return { mensaje: "Paciente eliminado correctamente" };
    } catch (error) {
      console.error("Error al eliminar el paciente:", error);
      throw error;
    }
  }

  static async eliminacionCompletaPacienteNN(id, options = {}) {
    try {
      const paciente = await Paciente.findByPk(id);
      if (!paciente) {
        throw new Error("Paciente no encontrado");
      }
      await paciente.destroy(options);
      return { mensaje: "Paciente eliminado correctamente" };
    } catch (error) {
      console.error("Error al eliminar el paciente:", error);
      throw error;
    }
  }

  static async altaLogicoPaciente(id, options = {}) {
    try {
      const paciente = await Paciente.findByPk(id);
      if (!paciente) {
        throw new Error("Paciente no encontrado");
      }
      await paciente.update({ borradoLogico: true }, options);
      return { mensaje: "Paciente eliminado correctamente" };
    } catch (error) {
      console.error("Error al eliminar el paciente:", error);
      throw error;
    }
  }

  static async modificarDatosPaciente(id, nuevosDatos, options = {}) {
    try {
      const paciente = await Paciente.findByPk(id);
      if (!paciente) {
        throw new Error("Paciente no encontrado");
      }
      delete nuevosDatos.dni;
      await paciente.update(nuevosDatos, options);
      return paciente;
    } catch (error) {
      console.error("Error al modificar los datos del paciente:", error);
      throw error;
    }
  }
  
  static async buscarPacientePorId(id) {
    try {
      const paciente = await Paciente.findByPk(id);
      if (!paciente) {
        throw new Error("Paciente no encontrado");
      }
      return paciente;
    } catch (error) {
      console.error("Error al buscar el paciente por ID:", error);
      throw error;
    }
  }

  static async anularEstadoNN(id, options = {}) {
    try {
      const paciente = await Paciente.findByPk(id);
      if (!paciente) {
        throw new Error("Paciente no encontrado");
      }
      await paciente.update({ es_nn: false }, options);
      return { mensaje: "Estado NN actualizado correctamente" };
    } catch (error) {
      console.error("Error al cambiar el estado NN del paciente:", error);
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
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true,
      validate: {
        is: {
          args: /^\d{8}$/,
          msg: "El DNI debe tener exactamente 8 números",
        },
      },
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
    es_nn: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
