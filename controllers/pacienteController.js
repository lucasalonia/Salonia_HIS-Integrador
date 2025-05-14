//PRIMER CONTROLADOR 
//NO SE EJECUTA EN EL SERVIDOR SINO DENTRO DE UN SCRIPT PUBLIC

//Aca implementamos agrePaciente de la carpeta model
const Paciente = require("../models/Paciente.js");


const crearPaciente = async (req, res) => {
  const pacienteNuevo = req.body.paciente;
  try {
    const resultado = await Paciente.crearPaciente(pacienteNuevo);
    res.status(201).json({success:true, mensaje: "Paciente agregado con éxito", resultado });
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({ mensaje: "Error al agregar paciente", error: error.message });
  }
};

const listarPacientes = async(req, res) => {
    let pacientes = await Paciente.listarPacientes();

     pacientes = pacientes.map((paciente) => {
            return {
                id: paciente.id,
                nombre: paciente.nombre,
                apellido: paciente.apellido,
                dni: paciente.dni,
                telefono: paciente.numero_emergencia,

                natalicio: new Date (paciente.fecha_nacimiento).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }),
                
                sexo: paciente.sexo,
                direccion: paciente.direccion,
                ciudad: paciente.ciudad,
                correo: paciente.email,
                obraSocial: paciente.obra_social,
                numeroObraSocial: paciente.numero_obra_social,
                medico: paciente.medico_derivador ? paciente.medico_derivador : "No especifica" ,
                vias: paciente.medios_ingreso,
                
                fecha_ingreso: new Date (paciente.fecha_ingreso).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                }),

                 internado: paciente.internado ? "Sí" : "No",

                
            };
        });
   
        res.render('pacientes/listaPacientes',{pacientes});
}


module.exports = {crearPaciente, listarPacientes};

