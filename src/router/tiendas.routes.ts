import express from 'express'
import { TiendaService } from '../services/tienda.service'

const tiendaRouter = express.Router()

const tiendaService = new TiendaService()

tiendaRouter.get('/', async (req, res, next) => {
  try {
    const listTiendas = await tiendaService.findAll()
    res.status(200).send(listTiendas)
  } catch (error) {
    next(error)
  }
})

export { tiendaRouter }
