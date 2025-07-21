const express = require("express");
const router = express.Router();
const pacienteController = require("../controllers/controllerPaciente"); 


//METODOS GET
router.get("/principal",  function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("medicina/principal", locals);
});


router.get("/evaluacionMedica",  function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("medicina/evaluacionMedica", locals);
});

router.get("/seguimiento",  function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("medicina/seguimiento", locals);
});
router.get("/altas",  function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("medicina/altas", locals);
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
  res.render("medicina/infoPaciente", locals);
});

module.exports = router;
