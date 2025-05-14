// //Modelo con MySQL2
// // const connection = require("../config/db.js");

// const listarPacientes = async () => {
//   try {
//     const [filas] = await connection.query("SELECT * FROM pacientes");
//     return filas;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// const buscarPacientePorDni = async (dni) => {
//   try {
//     const [filas] = await connection.query("SELECT * FROM pacientes WHERE dni = ?", [dni]);
//     return filas[0];
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// }

// const agregarPacienteModel = async (paciente) => {
//   try {
//     const query = `
//       INSERT INTO pacientes (nombre, apellido, dni, numero_emergencia, 
//       fecha_nacimiento, sexo, direccion, email, ciudad, medios_ingreso, medico_derivador, 
//       obra_social, numero_obra_social, fecha_ingreso, internado, borradoLogico)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), true, true)
//     `;

//     let hoy = new Date();
//     hoy.getFullYear();
//     const valores = [
//       paciente.nombre,
//       paciente.apellido,
//       paciente.dni,
//       paciente.telefono,
//       paciente.natalicio,
//       paciente.sexo,
//       paciente.direccion,
//       paciente.email,
//       paciente.ciudad,
//       paciente.vias,
//       paciente.medico,
//       paciente.obraSocial,
//       paciente.numeroObraSocial,
//     ];
//     const [resultado] = await connection.query(query, valores);
//     return resultado;
//   } catch (err) {
//     console.error("Error al agregar el paciente:", err);
//     throw err;
//   }
// };

// module.exports = { listarPacientes, agregarPacienteModel };


//Modelo con Sequelize
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
    sequelize, // Instancia de Sequelize
    modelName: "Paciente", // Nombre del modelo
    tableName: "pacientes", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactiva las columnas createdAt y updatedAt
  }
);

module.exports = Paciente;


