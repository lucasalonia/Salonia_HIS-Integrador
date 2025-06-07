const express = require("express");
const router = express.Router();

router.get("/principal", function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("administracion/principal", locals);
});
router.get("/camas", function (req, res, next) {
  const fotoPerfil = req.user.foto_perfil;
  const nombreUsuario = req.user.usuario;
  var locals = {
    fotoPerfil: fotoPerfil,
    nombreUsuario: nombreUsuario,
  };
  res.render("administracion/camas", locals);
});
router.get("/enfermeros", function (req, res, next) {
  res.render("administracion/enfermeros");
});
router.get("/medicos", function (req, res, next) {
  res.render("administracion/medicos");
});

module.exports = router;
