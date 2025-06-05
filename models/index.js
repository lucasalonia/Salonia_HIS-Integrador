const Paciente = require('./Paciente');
const Internacion = require('./Internacion');
const Derivacion = require('./Derivacion');
const Cama = require('./Cama');
const ObraSocial = require('./ObraSocial');
const Medico = require('./Medico');
const Habitacion = require('./Habitacion');
const Ala = require('./ALa');


const models = {
  Paciente,
  Internacion,
  Derivacion,
  Cama,
  ObraSocial,
  Medico,
  Habitacion,
  Ala
};


Object.values(models).forEach((model) => {
  if (typeof model.associate === 'function') {
    model.associate(models);
  }
});

module.exports = models;