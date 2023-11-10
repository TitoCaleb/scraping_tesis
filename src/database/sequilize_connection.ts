import { Sequelize } from "sequelize";
import { config } from '../../config/config'
import { setupModels } from "./models/index.model";

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

export const sequelize = new Sequelize(URI, {
  dialect: 'postgres'
})

setupModels(sequelize)
