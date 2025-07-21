const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

class PlanTratamiento extends Model {
  static associate(models) {
    PlanTratamiento.belongsTo(models.Paciente, {
      foreignKey: "id_paciente",
      as: "paciente",
    });
  }

  static async crearPlanTratamiento(
    id_paciente,
    tratamiento_dolor,
    options = {}
  ) {
    const [registro, creado] = await PlanTratamiento.findOrCreate({
      where: { id_paciente },
      defaults: { tratamiento_dolor },
      ...options,
    });

    if (!creado && registro.tratamiento_dolor !== tratamiento_dolor) {
      registro.tratamiento_dolor = tratamiento_dolor;
      await registro.save({ ...options });
    }

    return registro;
  }
}

PlanTratamiento.init(
  {
    id_tratamiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "pacientes",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    tratamiento_dolor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "PlanTratamiento",
    tableName: "plan_tratamiento",
    timestamps: false,
  }
);

module.exports = PlanTratamiento;
