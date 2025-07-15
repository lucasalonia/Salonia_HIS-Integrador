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

const Antecedentes = require("./catalogs/Antecedentes");
const HistorialAntecedentes = require("./HistorialAntecedentes");

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
};

Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

module.exports = models;
