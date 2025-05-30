const Internacion = require("../models/Internacion.js");

const internar = async (id_cama, id_paciente) => {
    
    const internacionData = {id_cama, id_paciente};
  try {
    const resultado = await Internacion.crearInternacion(internacionData);
    return resultado;
  } catch (error) {
    console.error("Error en el controlador:", error);
  }
};

module.exports = {internar}
