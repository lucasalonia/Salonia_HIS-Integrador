const express = require("express");
const router = express.Router();

const historialController = require('../controllers/controllerHistorial');
const motivosController = require('../controllers/controllerMotivos');
const pacienteController = require("../controllers/controllerPaciente"); 
const  evaluacionController = require("../controllers/controllerEvaluacion"); 


//METODOS POST
router.post("/historial/enviar-historial", function (req, res, next) {

  historialController.crearHistorial(req, res);
  
});

router.post("/motivosInternacion/enviar-motivos", function (req, res, next) {

  motivosController.crearMotivos(req, res);
  
});

router.post("/evaluacionFisica/enviar-evaluacion", function (req, res, next) {

  evaluacionController.crearEvaluacion(req, res);
  
});



//METODOS GET
router.get("/principal",  function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("enfermeria/principal", locals);
});

router.get("/infoPaciente", async function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
   const pacientes= await pacienteController.listarPacientesOpcionLimpia();
   console.log(pacientes.nombre);
   
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
    pacientes: pacientes
  };
  res.render("enfermeria/infoPaciente", locals);
});

router.get("/historial", async function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  const alergias = await historialController.obtenerAlergias();
  const enfermedades = await historialController.obtenerEnfermedades();
  const cirugias = await historialController.obtenerCirugias();

  
  const antecedentes = await historialController.obtenerAntecedentes();
  const medicamentos = await historialController.obtenerMedicamentos();
  
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
    alergias: alergias,
    enfermedades: enfermedades,
    cirugias: cirugias,
    antecedentes: antecedentes,
    medicamentos: medicamentos 
  };
  res.render("enfermeria/historial", locals);
});

router.get('/historial/buscar/:dni', async (req, res) => {
  historialController.obtnerDatosHistorial(req, res);
});

router.get("/motivoInternacion", async function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;

  const necesidades = await motivosController.obtenerNecesidades();
  const sintomas = await motivosController.obtenerSintomas();

  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
    necesidades:necesidades,
    sintomas: sintomas
  };
  res.render("enfermeria/motivoInternacion", locals);
});

router.get("/motivoInternacion/busqueda-generica/:dni", (req, res) => {
    const paciente= pacienteController.buscarPacientePorDniGenerico(req, res);
    
     
});

router.get("/evaluacionFisica", function (req, res, next) {
    const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("enfermeria/evaluacionFisica", locals);
});

router.get("/evaluacionFisica/busqueda-generica/:dni", (req, res) => {
    const paciente= pacienteController.buscarPacientePorDniGenerico(req, res);
    
     
});
router.get("/planCuidados", function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("enfermeria/planCuidados", locals);
});

module.exports = router;
