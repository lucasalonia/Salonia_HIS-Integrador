const {
  Intervenciones,
  Medicamentos,
  Paciente,
  PlanIntervenciones,
  PlanMedicamentos,
  PlanTratamiento
} = require("../models/index.js");

const { sequelize } = require("../config/db");

const obtenerIntervenciones = async () => {
  try {
    const intervenciones = await Intervenciones.listarIntervenciones();
    return intervenciones;
  } catch (error) {
    console.error("Error al obtener intervenciones:", error);
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


const crearPlan = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { dni, intervenciones, medicamentos, tratamiento} = req.body;


    const paciente = await Paciente.buscarPacientePorDni(dni);
    if (!paciente) {
      await transaction.rollback();
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    await PlanIntervenciones.crearPlanIntervencion(paciente.id, intervenciones, {
      transaction,
    });

    
    await PlanMedicamentos.crearPlanMedicamentos(paciente.id, medicamentos, {
      transaction,
    });

    
    await PlanTratamiento.crearPlanTratamiento(paciente.id, tratamiento, { transaction });


    await transaction.commit();
    console.log("paso");
    

    res.json({ message: "Motivos de internacion creado correctamente" });

  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear Motivos de internacion:", error);
    res.status(500).json({ error: "Error al crear Motivos de internacion" });
  }
}

module.exports = {
  obtenerMedicamentos,
  obtenerIntervenciones,
  crearPlan
};
