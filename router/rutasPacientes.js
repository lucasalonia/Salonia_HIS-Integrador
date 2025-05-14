const express = require('express');

const router = express.Router();

const pacienteController = require("../controllers/controllerPaciente"); 

router.get("/listaPacientes", function (req, res, next) {
   pacienteController.listarPacientes(req, res);    
});

router.post('/actualizar', (req, res) => {
    // pacienteController.modificarPaciente(req, res);
});


module.exports = router;