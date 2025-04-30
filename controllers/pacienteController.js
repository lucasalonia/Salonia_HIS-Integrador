//PRIMER CONTROLADOR 
//NO SE EJECUTA EN EL SERVIDOR SINO DENTRO DE UN SCRIPT PUBLIC

//Aca implementamos agrePaciente de la carpeta model
const  agregarPacienteModel  = require("../model/agregarPaciente.js");

const addPaciente =  (req, res) =>{
    if (!req.body || !req.body) {
        return res.status(400).json({ success: false, message: "Datos del paciente no proporcionados" });
    }

    const { paciente } = req.body;

    // Simula agregar el paciente (puedes reemplazar esto con lógica real)
    agregarPacienteModel.addPaciente(paciente);
    res.json({ success: true, message: "Paciente guardado correctamente" });
}

module.exports = {addPaciente};

