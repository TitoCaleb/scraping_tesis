import puppeteer,{type Page} from "puppeteer";
import { ProductosService } from "../services/productos.service";

const productoService = new ProductosService()

async function scrapyCardInfo(page: Page) {
  const cardInfo = await page.$$eval('.product-miniature', (elements) => {
    return elements.map((element) => {
      const imgSrc = element
        ?.querySelector('.product-thumbnail img')
        ?.getAttribute('src')
      const url = element
        ?.querySelector('.laberProduct-image a')
        ?.getAttribute('href')
      const imgTitle = element
        ?.querySelector('.product-thumbnail img')
        ?.getAttribute('alt')
      const priceElements = element.querySelectorAll(
        '.laber-product-price-and-shipping .price'
      )
      const prices = Array.from(priceElements).map((span) => span.textContent)
      const priceDolar = prices.length === 0 ? null : prices[0]
      const priceSoles =
        prices.length === 0 ? null : prices[1]?.toString().slice(2, -2)

      return {
        tienda: 2,
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

export async function scrapCyC() {
  console.log('Inicia el Scraping de C&C')
  const browser = await puppeteer.launch({
    headless: 'new',
    //slowMo: 220,
  })
  const page = await browser.newPage()
  await page.goto('https://cyccomputer.pe/250-pc-componente?page=34') //https://cyccomputer.pe/250-pc-componente?page=34
  const nextPageSelector = '.page-list a.next.js-search-link'
  let hasNextPage = true
  while (hasNextPage) {
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
    const nextPageElement = await page.$(nextPageSelector)
    if (nextPageElement) {
      await nextPageElement.click()
      await page.waitForNavigation({ waitUntil: 'domcontentloaded' })
    } else {
      hasNextPage = false
    }
  }
  await browser.close()
}
