const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../config/db.js");

class EvaluacionBasica extends Model {
  static associate(models) {
    EvaluacionBasica.belongsTo(models.Paciente, {
      foreignKey: "id_paciente",
      as: "paciente",
    });
  }
  static async crearEvaluacionBasica(
    {
      id_paciente,
      presion_arterial,
      frecuencia_cardiaca,
      frecuencia_respiratoria,
      temperatura_corporal,
      color_piel,
      respuesta_estimulo,
      fecha_ingreso,
      hora_ingreso,
    },
    options = {}
  ) {
    return await EvaluacionBasica.create(
      {
        id_paciente,
        presion_arterial,
        frecuencia_cardiaca,
        frecuencia_respiratoria,
        temperatura_corporal,
        color_piel,
        respuesta_estimulo,
        fecha_ingreso,
        hora_ingreso,
      },
      options
    );
  }
}

EvaluacionBasica.init(
  {
    id_evaluacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "paciente",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    presion_arterial: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 30,
        max: 300,
      },
    },
    frecuencia_cardiaca: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 30,
        max: 220,
      },
    },
    frecuencia_respiratoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    temperatura_corporal: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    color_piel: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    respuesta_estimulo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    fecha_ingreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    hora_ingreso: {
      type: DataTypes.TIME,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIME"),
    },
  },
  {
    sequelize,
    modelName: "EvaluacionBasica",
    tableName: "evaluacion_basica",
    timestamps: false,
  }
);

module.exports = EvaluacionBasica;
