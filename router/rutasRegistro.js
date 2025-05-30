const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/controllerPaciente");
const alasController = require("../controllers/controllerAla");
const habitacionesController = require("../controllers/controllerHabitacion");
const camasController = require("../controllers/controllerCama");
const medicosController = require("../controllers/controllerMedico");



//PROTOCOLOS POST
router.post("/paciente/agregar", (req, res) => {

  pacienteController.crearPaciente(req, res);

});

router.post("/paciente/agregar-habitacion", async (req, res) => {
  habitacionesController.cargarHabitacionesPorIdAla(req, res);
});

router.post("/paciente/agregar-cama", async (req, res) => {
  camasController.cargarCamaPorHabitacion(req, res);
});

//PROTOCOLOS GET
router.get("/", async function (req, res, next) {
  try {
    const alas = await alasController.listarAlas();
    const medicos = await medicosController.listaMedicos();

    var locals = {
      title: "Home",
      alas: alas,
      medicos: medicos,
    };

    res.render("index", locals);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
