const express = require('express');
const router = express.Router();
const mysql = require("mysql2");
const pacienteController = require("../controllers/pacienteController"); 

router.get("/listaPacientes", function (req, res, next) {
   pacienteController.listarPacientes(req, res);    
});

router.post('/actualizar', (req, res) => {
    // pacienteController.modificarPaciente(req, res);
});


module.exports = router;