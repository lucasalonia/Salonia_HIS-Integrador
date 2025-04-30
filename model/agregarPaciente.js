
//El MODELO LO UTILIZAMOS EN EL CONTROLADOR 
const fs = require("fs/promises");

const getPaciente = async () => {
    try {
      const data = await fs.readFile("./pacientesTest.json", "utf8"); 

      return JSON.parse(data);
    } catch (error) {
      console.error("Error al leer el archivo JSON:", error);
      return null;
    }
  };

const setPaciente = async (pacientes) => {
  try {
    await fs.writeFile("./pacientesTest.json", JSON.stringify(pacientes, null, 2));
  } 
  catch (error) {
    console.error("Error al escribir el archivo JSON:", error);
  }
};

const addPaciente = async (paciente) => {
  const pacientes = await getPaciente();
  if (pacientes === null) return;

  pacientes.push(paciente);

  await setPaciente(pacientes);

  return pacientes;
};

module.exports = {addPaciente};
