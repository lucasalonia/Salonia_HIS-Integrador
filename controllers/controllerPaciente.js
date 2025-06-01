const Paciente = require("../models/Paciente.js");
const Internacion = require("../models/Internacion.js");
const ObraSocial = require("../models/ObraSocial.js");
const Derivacion = require("../models/Derivacion.js");
const Cama = require("../models/Cama.js");
const Medico = require("../models/Medico.js");

const { sequelize } = require("../config/db");

const crearPaciente = async (req, res) => {
  const { paciente, mutual, medico, asignacion } = req.body;

  const transaction = await sequelize.transaction();
  const dni = paciente.dni;
  try {
    let pacienteCargado = await Paciente.buscarPacientePorDni(dni, {
      transaction,
    });
    if (pacienteCargado) {
      await pacienteCargado.update(paciente, { transaction });
    } else {
      pacienteCargado = await Paciente.crearPaciente(paciente, {
        transaction,
      });
    }

    await Internacion.crearInternacion(
      {
        id_cama: asignacion.cama,
        id_paciente: pacienteCargado.id,
      },
      { transaction }
    );

    const obraSocialExistente = await ObraSocial.buscarObraSocialPorIdPaciente(
      pacienteCargado.id,
      { transaction }
    );
    if (obraSocialExistente) {
      await obraSocialExistente.update(
        {
          nombre: mutual.obra_social,
          numero: mutual.numero_obra_social,
          id_paciente: pacienteCargado.id,
        },
        { transaction }
      );
    } else {
      await ObraSocial.crearObraSocial(
        {
          nombre: mutual.obra_social,
          numero: mutual.numero_obra_social,
          id_paciente: pacienteCargado.id,
        },
        { transaction }
      );
    }

    if (medico.medico_derivador) {
      await Derivacion.crearDerivacion(
        {
          id_medico: medico.medico_derivador,
          id_paciente: pacienteCargado.id,
        },
        { transaction }
      );
    }

    await Cama.actualizarEstadoCama(
      asignacion.cama,
      { liberada: false },
      { transaction }
    );

    await transaction.commit();

    res.status(201).json({
      success: true,
      mensaje: "Paciente agregado con éxito",
      pacienteCargado,
    });
  } catch (error) {
    console.error("Error en el controlador:", error);
    await transaction.rollback();
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

const buscarPacientePorDni = async (req, res) => {
  const dni = req.params.dni;

  const paciente = await Paciente.buscarPacientePorDni(dni);

  if (!paciente) {
    return res.json({ paciente: null, obraSocial: null, medico: null });
  }

  const id_paciente = paciente.id;
  const obraSocial = await ObraSocial.buscarObraSocialPorIdPaciente(
    id_paciente
  );

  const derivacion = await Derivacion.buscarDerivacionPorIdPaciente(
    id_paciente
  );
  let medico = null;
  if (derivacion && derivacion.id_medico) {
    medico = await Medico.buscarMedicoPorId(derivacion.id_medico);
  }

  res.json({ paciente, obraSocial, medico });
};

module.exports = { crearPaciente, listarPacientes, buscarPacientePorDni };
