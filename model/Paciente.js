//El MODELO LO UTILIZAMOS EN EL CONTROLADOR

const connection = require("../config/db");

const listarPacientes = async () => {
  try {
    const [filas] = await connection.query("SELECT * FROM pacientes");
    return filas;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const buscarPacientePorDni = async (dni) => {
  try {
    const [filas] = await connection.query("SELECT * FROM pacientes WHERE dni = ?", [dni]);
    return filas[0];
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const agregarPacienteModel = async (paciente) => {
  try {
    const query = `
      INSERT INTO pacientes (nombre, apellido, dni, numero_emergencia, 
      fecha_nacimiento, sexo, direccion, email, ciudad, medios_ingreso, medico_derivador, 
      obra_social, numero_obra_social, fecha_ingreso, internado, borradoLogico)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), true, true)
    `;

    let hoy = new Date();
    hoy.getFullYear();
    const valores = [
      paciente.nombre,
      paciente.apellido,
      paciente.dni,
      paciente.telefono,
      paciente.natalicio,
      paciente.sexo,
      paciente.direccion,
      paciente.email,
      paciente.ciudad,
      paciente.vias,
      paciente.medico,
      paciente.obraSocial,
      paciente.numeroObraSocial,
    ];
    const [resultado] = await connection.query(query, valores);
    return resultado;
  } catch (err) {
    console.error("Error al agregar el paciente:", err);
    throw err;
  }
};







module.exports = { listarPacientes, agregarPacienteModel };
