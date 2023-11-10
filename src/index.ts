import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { routerApi } from "./router/index.routes";
import {
  boomErrorHandler,
  errorHandler,
  logErrors,
} from "./middlewares/error.handler";
import cron from 'node-cron'
import { scrapAll } from "./app/scrapAll";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
const whitelist = ["http://localhost:5173"];
const options: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin || "") || !origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido"));
    }
  },
};

app.use(cors(options));

app.get("/", (req, res) => {
  res.send("El servidor ha iniciado");
});

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`El backend se inicio en el puerto ${PORT}`);
});

//scrapAll()

let task = cron.schedule('59 59 23 * * *', () => {
  //scrapAll()
  console.log('Se corre la tarea cada 1 dia')
})

task.start()
