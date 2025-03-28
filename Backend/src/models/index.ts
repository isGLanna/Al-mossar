import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('almossar', 'postgres', '!+@_#)', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432
})

export default sequelize;