const express = require('express');
const router = express.Router();
const pacienteController = require("../controllers/pacienteController"); 


//PROTOCOLOS POST
router.post("/agregar", (req, res) => {

  pacienteController.addPaciente(req, res);
  
});

module.exports = router;

