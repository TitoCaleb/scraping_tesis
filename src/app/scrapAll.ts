import { ProductosService } from "../services/productos.service";
import { scrapCyC } from "./scrapC&C";
import { scrapImpacto } from "./scrapImpacto";
import { scrapSercoPlus } from "./scrapSercoplus";

const productosService = new ProductosService()

export async function scrapAll() {
  productosService.deleteAll()
  await scrapCyC();
  await scrapImpacto();
  await scrapSercoPlus();
}
