const Internacion = require("../models/Internacion.js");

const internar = async (req, id_paciente) => {
    const id_cama = req.body.id_cama;
    const internacionData = {id_cama, id_paciente};
  try {
    const resultado = await Internacion.crearInternacion(internacionData);
    return resultado;
  } catch (error) {
    console.error("Error en el controlador:", error);
  }
};

module.exports = {internar}
