const { EvaluacionBasica, Paciente } = require("../models/index.js");

const { sequelize } = require("../config/db");

const crearEvaluacion = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      dni,
      presion_arterial,
      frecuencia_cardiaca,
      frecuencia_respiratoria,
      temperatura_corporal,
      color_piel,
      respuesta_estimulo,
    } = req.body;

    const paciente = await Paciente.buscarPacientePorDni(dni);
    if (!paciente) {
      await transaction.rollback();
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    const datosEvaluacion = {
      id_paciente: paciente.id,
      presion_arterial,
      frecuencia_cardiaca,
      frecuencia_respiratoria,
      temperatura_corporal,
      color_piel,
      respuesta_estimulo,
    };

    await EvaluacionBasica.crearEvaluacionBasica(datosEvaluacion, {
      transaction,
    });

    await transaction.commit();
    console.log("paso el commit");

    res.json({ message: "Evalucion creada correctamente" });
    
  } catch (error) {
    await transaction.rollback();
    console.error("Error al crear Evalucion:", error);
    res.status(500).json({ error: "Error al crear Evalucion" });
  }
};

module.exports = {
  crearEvaluacion,
};
