const {
  Paciente,
  Alergias,
  Enfermedades,
  Antecedentes,
  Cirugias,
  Medicamentos,
  HistorialAlergias,
  HistorialAntecedentes,
  HistorialCirugias,
  HistorialEnfermedades,
  HistorialMedicamentos

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

  let alergias;
  let enfermedades;
  let cirugias;
  let antecedentes;
  let medicamentos;

  if(paciente){

    alergias =  await Alergias.findAll({
    include: {
      model: Paciente,
      where: { id: paciente.id },
      attributes: [],
      through: { attributes: [] },
    },
  });
    enfermedades = await Enfermedades.findAll({
    include: {
      model: Paciente,
      where: { id: paciente.id },
      attributes: [],
      through: { attributes: [] },
    },
  });

  

    cirugias = await Cirugias.findAll({
    include: {
      model: Paciente,
      where: { id: paciente.id },
      attributes: [],
      through: { attributes: [] },
    },
  });
    antecedentes = await Antecedentes.findAll({
    include: {
      model: Paciente,
      where: { id: paciente.id },
      attributes: [],
      through: { attributes: [] },
    },
  });
    medicamentos = await Medicamentos.findAll({
    include: {
      model: Paciente,
      where: { id: paciente.id },
      attributes: [],
      through: { attributes: [] },
    },
  });
    
  res.json({paciente, alergias, enfermedades, cirugias, antecedentes, medicamentos});
}

  
};

const crearHistorial = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { dni, alergias, cirugias, enfermedades, antecedentes, medicamentos } = req.body;

    
    const paciente = await Paciente.buscarPacientePorDni(dni);
    if (!paciente) {
      await transaction.rollback();
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    await HistorialAlergias.crearHistorialAlergia(paciente.id, alergias, {
      transaction,
    });
    await HistorialAntecedentes.crearHistorialAntecedente(paciente.id, antecedentes, {
      transaction,
    });
    await HistorialCirugias.crearHistorialCirugia(paciente.id, cirugias, {
      transaction,
    });
    await HistorialEnfermedades.crearHistorialEnfermedad(paciente.id, enfermedades, {
      transaction,
    });
    await HistorialMedicamentos.crearHistorialMedicamento(paciente.id, medicamentos, {
      transaction,
    });

    await transaction.commit();
    console.log("paso el commit");
    
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
