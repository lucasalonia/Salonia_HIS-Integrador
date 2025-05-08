const express = require('express');
const router = express.Router();
const fs = require("fs");
const pacienteController = require("../controllers/pacienteController"); 


//PROTOCOLOS POST
router.post("/paciente/agregar", (req, res) => {

  pacienteController.addPaciente(req, res);
  
});

router.get("/", function (req, res, next) {
  fs.readFile('alaTest.json','utf8',(error, data)=>{
    if(error){
        res.status(500).send("Error interno del servidor. Archivo no encontrado")
        return;

    }
    else{

      const alaData = JSON.parse(data);
      const alas = alaData.map(ala => ala.nombre);

      //hardcodeamos un bojeto para la vista a modo de testeo
      const habitaciones = [
        { id: "01", cantidadCamas: 2 },
        { id: "02", cantidadCamas: 1 },
      ];
      const camas = [
        { id: "C1", libre: true, higienizada: true },
        { id: "C2", libre: false, higienizada: true },
      ];

      var locals = {
        title: "Home",
        alas: alas,
        habitaciones: habitaciones.map(habitacion => habitacion.id),
        camas: camas.map(cama => cama.id)

      };
      res.render("index", locals);
    }
  });
 
});

module.exports = router;

