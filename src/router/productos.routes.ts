import express from "express";
import { ProductosService } from "../services/productos.service";
import { validatorHandler } from "../middlewares/validator.handler";
import { createCategorySchema } from "../schemas/productos.schema";

const productosRouter = express.Router();

const productosService = new ProductosService();

productosRouter.get("/findAll", async (req, res, next) => {
  try {
    const { offset, limit } = req.query;
    const productos = await productosService.findAll(
      Number(limit),
      Number(offset)
    );
    res.status(200).send(productos);
  } catch (error) {
    next(error);
  }
});

productosRouter.get("/findByName", async (req, res, next) => {
  try {
    const { offset, limit, nombre } = req.query;
    const productos = await productosService.findByName(
      Number(limit),
      Number(offset),
      String(nombre)
    );
    res.status(200).send(productos);
  } catch (error) {
    next(error);
  }
});

productosRouter.post(
  "/",
  validatorHandler(createCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProducto = await productosService.create(body);
      res.status(201).send(newProducto);
    } catch (error) {
      next(error);
    }
  }
);


export { productosRouter };
