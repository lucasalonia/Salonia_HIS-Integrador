// models/Administrativo.js

const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");

class Administrativo extends Model {
  static async buscarPorID(id) {
    return await Administrativo.findByPk(id);
  }
  static async crearOAsociarAdministrativo(profile) {
    try {
      const [administrativo, creado] = await Administrativo.findOrCreate({
        where: {
          id_administrativo: profile.id_administrativo,
        },
        defaults: {
          usuario: profile.usuario,
          creado: new Date(),
          foto_perfil: profile.fotoPerfil,
        },
      });

      if (creado) {
        console.log("Nuevo admin creado");
      } else {
        console.log("Se encontró admin");
      }

      return administrativo;
    } catch (error) {
      console.error("Error en crearOAsociarAdministrativo:", error);
      throw error;
    }
  }
}
Administrativo.init(
  {
    id_administrativo: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto_perfil: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true, 
      },
    },
    creado: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "administrativos",
    timestamps: false,
  }
);

module.exports = Administrativo;
