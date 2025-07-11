const Cama = require("../models/Cama.js");

const cargarCamaPorHabitacion = async (req, res) => {
  const { habitacion } = req.body;
  
  
  const idHabNum = Number(habitacion);

  console.log(idHabNum);
  try {
    let camasPorHabitacion = await Cama.listarCamasPorHabitacion(idHabNum);
    
    res.json(camasPorHabitacion);
  } catch (error) {
    console.error("Error en cargarCamaPorHabitacion:", error); 
    res.status(500).json({ error: "Error al cargar camas" });
  }
};

const listaCompletaCamasLiberadas = async (req, res) => {
  try {
    const camasLiberadas = await Cama.listarCamasLiberadas();
    return camasLiberadas.map(cama => cama.toJSON());
  } catch (error) {
    console.error("Error al listar camas liberadas:", error);
    res.status(500).json({ error: "Error al listar camas liberadas" });
  }
}

module.exports = {cargarCamaPorHabitacion, listaCompletaCamasLiberadas};