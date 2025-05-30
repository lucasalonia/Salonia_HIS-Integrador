const Paciente = require("../models/Paciente.js");
const Internacion = require("../models/Internacion.js");
const ObraSocial = require("../models/ObraSocial.js");
const Derivacion = require("../models/Derivacion.js");
const Cama = require("../models/Cama.js");

const { sequelize } = require("../config/db");

const crearPaciente = async (req, res) => {

  const { paciente, mutual, medico, asignacion } = req.body;
  
  const transaction = await sequelize.transaction();

  try {
    const nuevoPaciente = await Paciente.crearPaciente(paciente, {
      transaction,
    });

    await Internacion.crearInternacion(
      {
        id_cama: asignacion.cama,
        id_paciente: nuevoPaciente.id,
      },
      { transaction }
    );

    await ObraSocial.crearObraSocial(
      {
        nombre: mutual.obra_social,
        numero: mutual.numero_obra_social,
        id_paciente: nuevoPaciente.id,
      },
      { transaction }
    );

    if (medico.medico_derivador) {
      await Derivacion.crearDerivacion(
        {
          id_medico: medico.medico_derivador,
          id_paciente: nuevoPaciente.id,
        },
        { transaction }
      );
    }

    await transaction.commit();


    res.status(201).json({
      success: true,
      mensaje: "Paciente agregado con éxito",
      nuevoPaciente,
    });
  } catch (error) {
    console.error("Error en el controlador:", error);
    res
      .status(500)
      .json({ mensaje: "Error al agregar paciente", error: error.message });
  }
};

const listarPacientes = async (req, res) => {
  let pacientes = await Paciente.listarPacientes();

  pacientes = pacientes.map((paciente) => {
    return {
      id: paciente.id,
      nombre: paciente.nombre,
      apellido: paciente.apellido,
      dni: paciente.dni,
      telefono: paciente.numero_emergencia,

      natalicio: new Date(paciente.fecha_nacimiento).toLocaleDateString(
        "es-AR",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      ),

      sexo: paciente.sexo,
      direccion: paciente.direccion,
      ciudad: paciente.ciudad,
      correo: paciente.email,
      obraSocial: paciente.obra_social,
      numeroObraSocial: paciente.numero_obra_social,
      medico: paciente.medico_derivador,
      vias: paciente.medios_ingreso,

      fecha_ingreso: new Date(paciente.fecha_ingreso).toLocaleDateString(
        "es-AR",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      ),

      internado: paciente.internado ? "Sí" : "No",
    };
  });

  res.render("pacientes/listaPacientes", { pacientes });
};

const buscarPacientePorDni = async (dni) => {
  try {
    const paciente = await Paciente.findOne({ where: { dni } });
    return paciente; 
  } catch (error) {
    throw error; 
  }
};

module.exports = { crearPaciente, listarPacientes, buscarPacientePorDni };
