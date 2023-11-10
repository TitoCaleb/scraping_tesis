import express from 'express'
import { tiendaRouter } from './tiendas.routes'
import { productosRouter } from './productos.routes'

export function routerApi(app: express.Application) {
  const router = express.Router()
  app.use('/api', router)
  router.use('/productos', productosRouter)
  router.use('/tiendas', tiendaRouter)
}
