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

const asociarDniCama = async (req,res)=>{

      const id_cama = req.body.id_cama;
      const dniActulizado =req.body.dni;    

  try {
    const resultado = await Cama.actualizarDniCama(id_cama,dniActulizado);
    res.status(201).json({success:true, mensaje: "DNI actualizado", resultado });
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ mensaje: "Error al agregar dni", error: error.message });
  }
}

module.exports = {cargarCamaPorHabitacion,asociarDniCama};