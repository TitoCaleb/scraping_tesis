import Joi from "joi";

const imgSrc = Joi.string()
const dataOriginal = Joi.string()
const imgTitle = Joi.string()
const priceDolar = Joi.string()
const priceSoles = Joi.string()
const url = Joi.string()
const tienda_id = Joi.number().integer()

export const createCategorySchema = Joi.object({
  imgSrc: imgSrc.required(),
  dataOriginal: dataOriginal.required(),
  imgTitle: imgTitle.required(),
  priceDolar: priceDolar.required(),
  priceSoles: priceSoles.required(),
  url: url.required(),
  tiendas_id: tienda_id.required()
})
