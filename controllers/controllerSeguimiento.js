const {
  Paciente,
  Fisioterapias,
  Ocupacionales,
  Tratamientos,
  Medicamentos,
  PacienteFisioterapias,
  PacienteOcupacionales,
  PacienteTratamientos,
  PacienteMedicamentos

} = require("../models/index.js");

const { sequelize } = require("../config/db");

const obtenerFisioterapias = async () => {
  try {
    const fisioterapias = await Fisioterapias.listarFisioterapias();
    return fisioterapias;
  } catch (error) {
    console.error("Error al obtener fisioterapias:", error);
    return [];
  }
};

const obtenerTratamientos = async () => {
  try {
    const tratamientos = await Tratamientos.listarTratamientos();
    return tratamientos;
  } catch (error) {
    console.error("Error al obtener terapias tratamientos medicos:", error);
    return [];
  }
};

const obtenerOcupacionales = async () => {
  try {
    const ocupacionales = await Ocupacionales.listarOcupacionales();
    return ocupacionales;
  } catch (error) {
    console.error("Error al obtener terapias ocupacionales:", error);
    return [];
  }
};

const obtenerMedicamentos = async () => {
  try {
    const medicamentos = await Medicamentos.listarMedicamentos();
    return medicamentos;
  } catch (medicamentos) {
    console.error("Error al obtener medicamentos:", error);
    return [];
  }
};

const crearSeguimiento = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { dni, tratamientos, fisioterapias, ocupacionales } = req.body;

    const paciente = await Paciente.buscarPacientePorDni(dni);

    if (!paciente) {
      await transaction.rollback();
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    await PacienteTratamientos.crearPacienteTratamientos(paciente.id, tratamientos, {
      transaction,
    });

    await PacienteFisioterapias.crearPacienteFisioterapias(
      paciente.id,
      fisioterapias,
      {
        transaction,
      }
    );

    await PacienteOcupacionales.crearPacienteOcupacionales(paciente.id, ocupacionales, {
      transaction,
    });

    await transaction.commit();
    console.log("pasó el commit");

    res.json({ message: "Seguimiento creado correctamente" });
  } catch (error) {
    await transaction.rollback();

    console.error("Error al crear Seguimiento:", error);

    res.status(500).json({ error: "Error al crear Evaluacion Medica" });
  }
};
const crearSeguimientoMedicamentos = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { dni, medicamento } = req.body;
    
    const paciente = await Paciente.buscarPacientePorDni(dni);
    
    if (!paciente) {
      await transaction.rollback();
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    await PacienteMedicamentos.crearPacienteMedicamentos(paciente.id, medicamento, {
      transaction,
    });

    await transaction.commit();
    
    res.json({ message: "Seguimiento de medicamentos creado correctamente" });
  } catch (error) {
    await transaction.rollback();

    console.error("Error al crear Seguimiento de medicamentos:", error);

    res.status(500).json({ error: "Error al crear Seguimiento de medicamentos" });
  }
};

module.exports = {
  obtenerTratamientos,
  obtenerOcupacionales,
  obtenerFisioterapias,
  crearSeguimiento,
  obtenerMedicamentos,
  crearSeguimientoMedicamentos
};
