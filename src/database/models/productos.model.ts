import { Model, DataTypes } from "sequelize";
import type { Sequelize } from "sequelize";
import { TIENDAS_TABLE } from "./tiendas.model";

export const PRODUCTO_TABLE = "productos";

export const ProductoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  imgSrc: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  dataOriginal: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  imgTitle: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  priceDolar: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  priceSoles: {
    allowNull: true,
    type: DataTypes.STRING,
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  tiendaId: {
    allowNull: false,
    field: "tiendas_id",
    type: DataTypes.INTEGER,
  },
};

export class Producto extends Model {
  static associate(models: Sequelize["models"]) {
    this.belongsTo(models.Tiendas, {
      as: 'tiendas',
      foreignKey: 'tiendas_id',
    });
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: PRODUCTO_TABLE,
      modelName: "Producto",
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    };
  }
}
