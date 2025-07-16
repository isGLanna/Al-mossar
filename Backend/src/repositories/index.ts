import { Sequelize } from 'sequelize';
import 'dotenv/config'

const sequelize = new Sequelize(
  process.env.DB_DATABASE || 'almossar', 
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  }
);

// O resto do seu código permanece o mesmo
try {
  await sequelize.authenticate();
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
} catch (error) {
  console.error('Erro ao conectar no banco de dados:', error);
}

export default sequelize;