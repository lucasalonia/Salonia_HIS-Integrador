const ObraSocial = require("../models/ObraSocial.js");

const asignarObraSocial = async (req, id_paciente) => {
  const nombre = req.body.obra_social;
  const numero = req.body.numero_obra_social;
  const obraSocialData = { id_paciente, nombre, numero };
  try {
    const resultado = await ObraSocial.crearObraSocial(obraSocialData);
    return resultado;
  } catch (error) {
    throw new Error("Error al agregar Obra Social: " + error.message);
  }
};

module.exports = {asignarObraSocial}
