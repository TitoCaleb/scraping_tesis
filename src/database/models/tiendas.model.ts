import {Model, Sequelize, DataTypes} from 'sequelize'

export const TIENDAS_TABLE = 'tiendas'

export const TiendasSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  }
}

export class Tiendas extends Model {

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TIENDAS_TABLE,
      modelName: 'Tiendas',
      timeStamps: false,
      createdAt: false,
      updatedAt: false
    }
  }
}
