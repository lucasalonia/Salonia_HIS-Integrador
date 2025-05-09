const express = require('express');
const router = express.Router();
const mysql = require("mysql2");


router.get("/listaPacientes", function (req, res, next) {
    const connection = mysql.createConnection({
        host: "localhost",
        user: 'root',
        password: '',
        database: 'his_integrador',
    })
    const sql = "SELECT * FROM pacientes";

    connection.query(sql, (error, result) => {
        if(error) {
            console.log(error);
            return res.status(500).send("Error en la consulta a la base de datos");
        }
        console.log(result);
        const pacientes = result.map((paciente) => {
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
                medico: paciente.medico_derivador,
                vias: paciente.medios_ingreso,
                
            };
        });
        
        res.render('pacientes/listaPacientes',{pacientes});
    })    
});


module.exports = router;