import puppeteer,{type Page} from "puppeteer";
import { ProductosService } from "../services/productos.service";

const productoService = new ProductosService()


async function scrapyCardInfo(page: Page) {
  const cardInfo = await page.$$eval('.single-product', (elements) => {
    return elements.map((element) => {
      const imgSrc = element
        ?.querySelector('.product-image img')
        ?.getAttribute('src')
      const url = element.querySelector('.product-image a')?.getAttribute('href')
      const imgTitle = element
        ?.querySelector('.product-image img')
        ?.getAttribute('alt')
      const priceSale = element
        ?.querySelector('.price-sale-2')
        ?.textContent?.trim()
      const [priceDolar, priceSoles] = priceSale!
        .split('-')
        .map((value) => value.trim())

      return {
        tienda: 1,
        imgSrc,
        dataOriginal: null,
        imgTitle,
        priceDolar,
        priceSoles,
        url,
      }
    })
  })

  return cardInfo
}

export async function scrapImpacto() {
  console.log('Se inicio el scrapeo de impacto')
  const browser = await puppeteer.launch({
    headless: 'new',
    slowMo: 220,
  })
  const page = await browser.newPage()
  await page.goto('https://www.impacto.com.pe/catalogo')
  const pageNumber = await page.$$eval(
    '.pagination li.page-item:nth-last-child(2) a.page-link',
    (elements) => {
      const lastPageLink = elements[0]
      if (!lastPageLink.textContent) return
      return parseInt(lastPageLink.textContent)
    }
  ) || 0
  for (let i = 76; i <= pageNumber; i++) {
    await page.goto(`https://www.impacto.com.pe/catalogo?page=${i}`) //https://www.impacto.com.pe/catalogo?page=76
    const cardInfo = await scrapyCardInfo(page)
    cardInfo.forEach(item => {
      console.log(item)
      productoService.create({
        imgSrc: item.imgSrc!,
        dataOriginal: item.dataOriginal!,
        imgTitle: item.imgTitle!,
        priceDolar: item.priceDolar!,
        priceSoles: item.priceSoles!,
        url: item.url!,
        "tiendas_id": item.tienda
      })
    })
  }
  await browser.close()
}

