const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db.js");

class InternacionPrioridad extends Model {
  static associate(models) {
    InternacionPrioridad.belongsTo(models.Internacion, {
      foreignKey: "id_internacion",
      as: "internacion",
    });
  }

  static async crearInternacionPrioridad(id_internacion, prioridad, options = {}) {
  const [registro, creado] = await InternacionPrioridad.findOrCreate({
    where: { id_internacion },
    defaults: { prioridad },
    ...options
  });
  return registro; 
}
}

InternacionPrioridad.init(
  {
    id_internacion_prioridad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    id_internacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: "internaciones",
        key: "id_internacion",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    prioridad: {
      type: DataTypes.ENUM("Alta", "Media", "Baja"),
      allowNull: false,
      defaultValue: "Media",
    },
  },
  {
    sequelize,
    modelName: "InternacionPrioridad",
    tableName: "internacion_prioridad",
    timestamps: false,
  }
);

module.exports = InternacionPrioridad;
