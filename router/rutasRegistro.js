const express = require('express');
const router = express.Router();
const fs = require("fs");
const pacienteController = require("../controllers/controllerPaciente"); 
const alasController = require("../controllers/controllerAla"); 
const habitacionesController = require("../controllers/controllerHabitacion"); 
const camasController = require("../controllers/controllerCama"); 
const medicosController = require("../controllers/controllerMedico"); 
const internacionesController = require("../controllers/controllerInternacion"); 
const medicoDerivadorController = require("../controllers/controllerMedicoDerivador");
const obraSocialController = require("../controllers/controllerObraSocial");
const { log } = require('console');



//PROTOCOLOS POST
router.post("/paciente/agregar", (req, res) => {
  pacienteController.crearPaciente(req, res); 
});


router.post("/paciente/asignar-datos", async (req, res) => {
  try {
    
    const paciente = await pacienteController.buscarPacientePorDni(req.body.dni);
    if (!paciente) return res.status(404).json({ mensaje: "Paciente no encontrado" });

    
    const id_paciente = paciente.id;
    console.log(id_paciente);
    
    const internacion = await internacionesController.internar(req, id_paciente);
    const derivacion = await medicoDerivadorController.asignarMedicoDerivador(req,  id_paciente);
    const obraSocial = await obraSocialController.asignarObraSocial(req, id_paciente);

    res.status(201).json({
      success: true,
      mensaje: "Datos asignados correctamente",
      data: {
        internacion,
        derivacion,
        obraSocial
      }
    });

  } catch (error) {
    console.error("Error en la asignación de datos:", error);
    res.status(500).json({ success: false, mensaje: error.message });
  }
});

// router.post("/paciente/asignar-dni", (req, res) => {
  
//   camasController.asociarDniCama(req,res);
  
// });

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

