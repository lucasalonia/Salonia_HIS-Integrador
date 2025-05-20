const Ala = require("../models/Ala.js");

const listarAlas = async (req,res) =>{
     const alas = await Ala.listarAlas();
      return alas.map(ala => ala.toJSON());
};

module.exports = {listarAlas};