import puppeteer, { Page } from 'puppeteer'
import { ProductosService } from '../services/productos.service'

const productoService = new ProductosService()


async function filterOptions(cardInfo: any ) {
  const filterCards1 = await cardInfo.filter((item: any) => item.priceDolar !== null)
  return filterCards1
}

async function scrapyCardInfo(page: Page) {
  const cardInfo = await page.$$eval('.product-miniature', (elements) => {
    return elements.map((element) => {
      const imgSrc = element
        ?.querySelector('.product-thumbnail img')
        ?.getAttribute('src')
      const dataOriginal = element
        ?.querySelector('.product-thumbnail img')
        ?.getAttribute('data-original')
      const url = element?.querySelector('.product-name a')?.getAttribute('href')
      const imgTitle = element
        ?.querySelector('.product-thumbnail img')
        ?.getAttribute('title')
      const priceElements = element.querySelectorAll('.first-prices .currency2')
      const prices = Array.from(priceElements).map((span) => span.textContent)
      const priceDolar = prices.length === 0 ? null : prices[0]
      const priceSoles =
        prices.length === 0 ? null : prices[1]?.toString().slice(1, -1)

      return {
        tienda: 3,
        imgSrc,
        dataOriginal,
        imgTitle,
        priceDolar,
        priceSoles,
        url,
      }
    })
  })

  return cardInfo
}

export async function scrapSercoPlus() {
  console.log('Inicia el scrapeo de Sercoplus')
  const browser = await puppeteer.launch({
    headless: 'new',
    //slowMo: 220,
  })
  const page = await browser.newPage()
  await page.goto('https://www.sercoplus.com/731-arma-tu-pc') //https://www.sercoplus.com/731-arma-tu-pc?page=49
  const pageNumber = await page.$$eval(
    '.page-list li:nth-last-child(2) a.js-search-link',
    (elements) => {
      const lastPageLink = elements[0]
      if (!lastPageLink.textContent) return
      return parseInt(lastPageLink.textContent)
    }
  ) || 0

  for (let i = 48; i <= pageNumber; i++) {
    await page.goto(`https://www.sercoplus.com/731-arma-tu-pc?page=${i}`) //https://www.sercoplus.com/731-arma-tu-pc?page=48
    const cardInfo = await scrapyCardInfo(page)
    const filterCards = await filterOptions(cardInfo)
    filterCards.forEach((item: any) => {
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

