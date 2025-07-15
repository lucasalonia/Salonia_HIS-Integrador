const {
  Paciente,
  Alergias,
  Enfermedades,
  Antecedentes,
  Cirugias,
  Medicamentos,
  HistorialAlergias,
} = require("../models/index.js");

const { sequelize } = require("../config/db");

const obtenerAlergias = async () => {
  try {
    const alergias = await Alergias.listarAlergias();
    return alergias;
  } catch (error) {
    console.error("Error al obtener alergias:", error);
    return [];
  }
};

const obtenerEnfermedades = async () => {
  try {
    const enfermedades = await Enfermedades.listarEnfermedades();
    return enfermedades;
  } catch (error) {
    console.error("Error al obtener enfermedades:", error);
    return [];
  }
};

const obtenerCirugias = async () => {
  try {
    const cirugias = await Cirugias.listarCirugias();
    return cirugias;
  } catch (cirugias) {
    console.error("Error al obtener cirugias:", error);
    return [];
  }
};

const obtenerAntecedentes = async () => {
  try {
    const atecendetes = await Antecedentes.listarAntecedentes();
    return atecendetes;
  } catch (atecendetes) {
    console.error("Error al obtener atecendetes:", error);
    return [];
  }
};
const obtenerMedicamentos = async () => {
  try {
    const medicamentos = await Medicamentos.listarMedicamentos();
    return medicamentos;
  } catch (medicamentos) {
    console.error("Error al obtener medicamentos:", error);
    return [];
  }
};

const obtnerDatosHistorial = async (req, res) => {
  const dni = req.params.dni;
  
  const paciente = await Paciente.buscarPacientePorDni(dni);
  const alergias = await Alergias.findAll({
    include: {
      model: Paciente,
      where: { id: paciente.id },
      attributes: [],
      through: { attributes: [] },
    },
  });

  if (!paciente && !alergias) {
    return res.json({ paciente: null, alergias: null});
  }

  res.json({paciente, alergias});
};

const crearHistorial = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { dni, alergias } = req.body;

    const paciente = await Paciente.buscarPacientePorDni(dni);
    if (!paciente) {
      await t.rollback();
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    await HistorialAlergias.crearHistorial(paciente.id, alergias, {
      transaction,
    });

    await transaction.commit();

    res.json({ message: "Historial creado correctamente" });
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    res.status(500).json({ error: "Error al crear historial" });
  }
};

module.exports = {
  obtenerAlergias,
  obtenerEnfermedades,
  obtenerCirugias,
  obtenerAntecedentes,
  obtenerMedicamentos,
  crearHistorial,
  obtnerDatosHistorial,
};
