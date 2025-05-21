const MedicoDerivador = require("../models/MedicoDerivador.js");

const asignarMedicoDerivador = async (req, id_paciente) => {
  const id_medico = req.body.id_medico;
  const medicoDerivadorData = { id_medico, id_paciente };
  try {
    const resultado = await MedicoDerivador.crearDerivacion(medicoDerivadorData);
    return resultado;
  } catch (error) {
    throw new Error("Error al agregar Medico Derivador: " + error.message);
  }
};


module.exports = {asignarMedicoDerivador}