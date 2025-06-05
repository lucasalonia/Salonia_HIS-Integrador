const express = require('express');
const router = express.Router();


router.get("/principal", function (req, res, next) {
    res.render('administracion/principal');
});
router.get("/camas", function (req, res, next) {
    res.render('administracion/camas');
});
router.get("/enfermeros", function (req, res, next) {
    res.render('administracion/enfermeros');
});
router.get("/medicos", function (req, res, next) {
    res.render('administracion/medicos');
});

module.exports = router;