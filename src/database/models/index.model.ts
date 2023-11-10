import { Producto, ProductoSchema } from "./productos.model";
import { Tiendas, TiendasSchema } from "./tiendas.model";
import type {Sequelize} from 'sequelize'


export function setupModels(sequelize: Sequelize) {
  Tiendas.init(TiendasSchema, Tiendas.config(sequelize))
  Producto.init(ProductoSchema, Producto.config(sequelize))

  Producto.associate(sequelize.models)
}
