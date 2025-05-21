const Medico = require("../models/Medico.js");

const listaMedicos = async (req,res) =>{
     const medicos = await Medico.listarMedicos();
      return medicos.map(medico => medico.toJSON());
};

module.exports = {listaMedicos};