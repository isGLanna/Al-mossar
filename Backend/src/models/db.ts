import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('almossar', 'postgres', '!+@_#)', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
})