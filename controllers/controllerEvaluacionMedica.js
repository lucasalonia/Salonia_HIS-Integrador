const {
  Paciente,
  Analisis,
  Resonancias,
  Radiografias,
  PacienteAnalisis,
  PacienteRadiografia,
  PacienteResonancia

} = require("../models/index.js");

const { sequelize } = require("../config/db");

const obtenerAnalisis = async () => {
  try {
    const analisis = await Analisis.listarAnalisis();
    return analisis;
  } catch (error) {
    console.error("Error al obtener Analisis:", error);
    return [];
  }
};

const obtenerRadiografias = async () => {
  try {
    const radiografias = await Radiografias.listarRadiografias();
    return radiografias;
  } catch (error) {
    console.error("Error al obtener radiografias:", error);
    return [];
  }
};

const obtenerResonancias = async () => {
  try {
    const resonancias = await Resonancias.listarResonancias();
    return resonancias;
  } catch (error) {
    console.error("Error al obtener resonancias:", error);
    return [];
  }
};

const crearEvaluacionMedica = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { dni, analisis, radiografias, resonancias } = req.body;
    console.log(analisis, radiografias, resonancias);

    const paciente = await Paciente.buscarPacientePorDni(dni);
    
    
    if (!paciente) {
      await transaction.rollback();
      return res.status(404).json({ error: "Paciente no encontrado" });
    }

    await PacienteAnalisis.crearPacienteAnalisis(
      paciente.id,
      analisis,
      {
        transaction,
      }
    );

    await PacienteRadiografia.crearPacienteRadiografia(paciente.id, radiografias, {
      transaction,
    });

    await PacienteResonancia.crearPacienteResonancia(paciente.id, resonancias, {
      transaction,
    });

    await transaction.commit();
    console.log("pasó el commit");

    res.json({ message: "Motivos de internacion creado correctamente" });

  } catch (error) {

    await transaction.rollback();

    console.error("Error al crear Evaluacion Medica:", error);

    res.status(500).json({ error: "Error al crear Evaluacion Medica" });
  }
};


module.exports = {
  obtenerAnalisis,
  obtenerResonancias,
  obtenerRadiografias,
  crearEvaluacionMedica,
};
