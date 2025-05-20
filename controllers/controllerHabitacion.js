const Habitacion = require("../models/Habitacion.js");


const cargarHabitacionesPorIdAla = async (req, res) => {
  const { ala } = req.body;
  const idAlaNum = Number(ala);
  try {
    let habitacionesPorAla = await Habitacion.listarHabitacionesPorAla(idAlaNum);
    res.json(habitacionesPorAla);
  } catch (error) {
    res.status(500).json({ error: "Error al cargar habitaciones" });
  }
};

module.exports = {cargarHabitacionesPorIdAla};
