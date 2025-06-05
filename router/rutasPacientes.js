const express = require('express');

const router = express.Router();

const pacienteController = require("../controllers/controllerPaciente"); 

//GETS
router.get("/listaPacientes", function (req, res, next) {
   pacienteController.listarPacientes(req, res);    
});
router.get('/ficha-paciente/:id', (req, res) => {
     pacienteController.recuperarDatosPaciente(req, res);  
});


//POSTS
router.post('/modificar-datos/:id', (req, res) => {
        pacienteController.modificarDatosPaciente(req, res);
});



router.patch('/eliminar/:id', (req, res) => {
     pacienteController.boradoLogicoPaciente(req, res);      
});



module.exports = router;