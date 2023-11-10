import {sequelize} from '../database/sequilize_connection'

export class TiendaService {
  constructor() {}

  async findAll(){
    const tiendas = await sequelize.models.Tiendas.findAndCountAll()
    return {
      statusCode : 200,
      data : tiendas
    }
  }
}
