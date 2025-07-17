const { Necesidades, Sintomas, Paciente, PacienteNecesidades, PacienteSintomas, InternacionPrioridad, Internacion} = require("../models/index.js");

const { sequelize } = require("../config/db");

const obtenerNecesidades = async () => {
  try {

    const necesidades = await Necesidades.listarNecesidades();
    return necesidades;

  } catch (error) {

    console.error("Error al obtener Necesidades inmediatas:", error);
    return [];

  }
};

const obtenerSintomas = async () => {
  try {

    const sintomas = await Sintomas.listarSintomas();
    return sintomas;

  } catch (error) {

    console.error("Error al obtener Sintomas:", error);
    return [];

  }
};

const crearMotivos = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { dni, necesidades, sintomas, prioridad } = req.body;
    console.log(dni, necesidades, sintomas, prioridad );

    const paciente = await Paciente.buscarPacientePorDni(dni);
    if (!paciente) {
      await transaction.rollback();
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    await PacienteNecesidades.crearPacienteNecesidades(paciente.id, necesidades, {
      transaction,
    });

    await PacienteSintomas.crearPacienteSintomas(paciente.id, sintomas, {
      transaction,
    });

   
    
    const internacion = await Internacion.buscarInternacionPorIdPaciente(paciente.id);


    await InternacionPrioridad.crearInternacionPrioridad(internacion.id_internacion, prioridad, { transaction });

    await transaction.commit();
    console.log("pasó el commit");

    res.json({ message: "Motivos de internacion creado correctamente" });

  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear Motivos de internacion:", error);
    res.status(500).json({ error: "Error al crear Motivos de internacion" });
  }
}

module.exports = {
  obtenerNecesidades,
  obtenerSintomas,
  crearMotivos
};