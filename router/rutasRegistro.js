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
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  try {
    const alas = await alasController.listarAlas();
    const medicos = await medicosController.listaMedicos();
    const camas = await camasController.listaCompletaCamasLiberadas();
    let activarModal = false;

    if(camas.length === 0) {
       activarModal = true;
    }

    var locals = {
      title: "Home",
      alas: alas,
      medicos: medicos,
      activarModal: activarModal,
      fotoPerfil: fotoPerfil,
      nombreUsuario: nombreUsuario
    };

    res.render("index", locals);
  } catch (error) {
    next(error);
  }
});



//Buscar paciente por DNI
router.get('/paciente/buscar/:dni', async (req, res) => {
  pacienteController.buscarPacientePorDni(req, res);
});
router.get("/paciente/ultimo-paciente-nn", async (req, res) => {
  pacienteController.buscarUltimoPacienteNN(req, res);
});




module.exports = router;
