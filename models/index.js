const Paciente = require("./Paciente");
const Internacion = require("./Internacion");
const Derivacion = require("./Derivacion");
const Cama = require("./Cama");
const ObraSocial = require("./ObraSocial");
const Medico = require("./Medico");
const Habitacion = require("./Habitacion");
const Ala = require("./Ala");

const Alergias = require("./catalogs/Alergias");
const HistorialAlergias = require("./HistorialAlergias");

const Enfermedades = require("./catalogs/Enfermedades");
const HistorialEnfermedades = require("./HistorialEnfermedades");

const Cirugias = require("./catalogs/Cirugias");
const HistorialCirugias = require("./HistorialCirugias");

const Medicamentos = require("./catalogs/Medicamentos");
const HistorialMedicamentos = require("./HistorialMedicamentos");
const PlanMedicamentos = require("./PlanMedicamentos");

const Antecedentes = require("./catalogs/Antecedentes");
const HistorialAntecedentes = require("./HistorialAntecedentes");

const Necesidades = require("./catalogs/Necesidades");;
const PacienteNecesidades = require("./PacienteNecesidades");

const Sintomas = require("./catalogs/Sintomas");
const PacienteSintomas = require("./PacienteSintomas");

const InternacionPrioridad = require("./InternacionPrioridad");
const EvaluacionBasica = require("./EvaluacionBasica");

const Intervenciones = require("./catalogs/Intervenciones");
const PlanIntervenciones = require("./PlanIntervenciones");

const PlanTratamiento = require("./PlanTratamiento");

const Analisis = require("./catalogs/Analisis");
const PacienteAnalisis = require("./PacienteAnalisis");

const Resonancias = require("./catalogs/Resonancias");
const PacienteResonancia = require("./PacienteResonancia");

const Radiografias = require("./catalogs/Radiografias");
const PacienteRadiografia = require("./PacienteRadiografia");



const models = {
  Paciente,
  Internacion,
  Derivacion,
  Cama,
  ObraSocial,
  Medico,
  Habitacion,
  Ala,
  Alergias,
  HistorialAlergias,
  Enfermedades,
  HistorialEnfermedades,
  Cirugias,
  HistorialCirugias,
  Medicamentos,
  HistorialMedicamentos,
  Antecedentes,
  HistorialAntecedentes,
  Necesidades,
  PacienteNecesidades,
  Sintomas,
  PacienteSintomas,
  InternacionPrioridad,
  EvaluacionBasica,
  Intervenciones,
  PlanIntervenciones,
  PlanMedicamentos,
  PlanTratamiento,
  Analisis,
  Resonancias,
  Radiografias,
  PacienteAnalisis,
  PacienteResonancia,
  PacienteRadiografia

};

Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

module.exports = models;
