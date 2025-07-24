const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/controllerPaciente");
const evaluacionMedicaController = require("../controllers/controllerEvaluacionMedica");

//METODOS POST
router.post("/evaluacionMedica/enviar-evaluacionMedica", function (req, res, next) {

  evaluacionMedicaController.crearEvaluacionMedica(req, res);
  
});






//METODOS GET
router.get("/principal", function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("medicina/principal", locals);
});

router.get("/evaluacionMedica", async function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;

  const analisis = await evaluacionMedicaController.obtenerAnalisis();
  const resonancias = await evaluacionMedicaController.obtenerResonancias();
  const radiografias = await evaluacionMedicaController.obtenerRadiografias();

  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
    analisis: analisis,
    radiografias: radiografias,
    resonancias: resonancias,
  };
  res.render("medicina/evaluacionMedica", locals);
});

router.get("/evaluacionMedica/busqueda-generica/:dni", (req, res) => {
    const paciente= pacienteController.buscarPacientePorDniGenerico(req, res);
    
     
});

router.get("/seguimiento", function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("medicina/seguimiento", locals);
});

router.get("/seguimiento/busqueda-generica/:dni", (req, res) => {
    const paciente= pacienteController.buscarPacientePorDniGenerico(req, res);
    
     
});


router.get("/altas", function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("medicina/altas", locals);
});

router.get("/altas/busqueda-generica/:dni", (req, res) => {
    const paciente= pacienteController.buscarPacientePorDniGenerico(req, res);
    
     
});

router.get("/infoPaciente", async function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  const pacientes = await pacienteController.listarPacientesOpcionLimpia();
  console.log(pacientes.nombre);

  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
    pacientes: pacientes,
  };
  res.render("medicina/infoPaciente", locals);
});

module.exports = router;
