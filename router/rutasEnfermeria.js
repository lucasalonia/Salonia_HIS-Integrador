const express = require('express');
const router = express.Router();


router.get("/principal", function (req, res, next) {
    res.render('enfermeria/principal');
});
router.get("/infoPaciente", function (req, res, next) {
    res.render('enfermeria/infoPaciente');
});
router.get("/historial", function (req, res, next) {
    res.render('enfermeria/historial');
});
router.get("/motivoInternacion", function (req, res, next) {
    res.render('enfermeria/motivoInternacion');
});
router.get("/evaluacionFisica", function (req, res, next) {
    res.render('enfermeria/evaluacionFisica');
});
router.get("/planCuidados", function (req, res, next) {
    res.render('enfermeria/planCuidados');
});

module.exports = router;