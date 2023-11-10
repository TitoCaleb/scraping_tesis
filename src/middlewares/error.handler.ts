import { Boom } from "@hapi/boom";
import { type NextFunction, Response, Request } from "express";

export function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  next(err);
}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}


export function boomErrorHandler(err: Boom, req: Request, res: Response, next: NextFunction) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}
