const ObraSocial = require("../models/ObraSocial.js");

const asignarObraSocial = async (nombre,numero, id_paciente) => {
 
  const obraSocialData = { id_paciente, nombre, numero };
  try {
    const resultado = await ObraSocial.crearObraSocial(obraSocialData);
    return resultado;
  } catch (error) {
    throw new Error("Error al agregar Obra Social: " + error.message);
  }
};

module.exports = {asignarObraSocial}
