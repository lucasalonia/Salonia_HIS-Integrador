const express = require("express");
const router = express.Router();
const historialController = require('../controllers/controllerHistorial');


//METODOS POST
router.post("/historial/enviar-historial", function (req, res, next) {

  historialController.crearHistorial(req, res);
  
});



//METODOS GET
router.get("/principal", function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("enfermeria/principal", locals);
});
router.get("/infoPaciente", function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
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

router.get("/motivoInternacion", function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("enfermeria/motivoInternacion", locals);
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
