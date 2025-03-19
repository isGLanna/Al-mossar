import { Sequelize} from 'sequelize'

const sequelize = new Sequelize('Almossar', 'giordano', '1234' {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
})

export default sequelize