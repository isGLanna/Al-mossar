import { Sequelize } from 'sequelize';
import 'dotenv/config'

const sequelize = new Sequelize(process.env.POSTGRES_URL);

// O resto do seu código permanece o mesmo
try {
  await sequelize.authenticate();
  console.log('Conexão com o banco de dados estabelecida com sucesso.');
} catch (error) {
  console.error('Erro ao conectar no banco de dados:', error);
}

export default sequelize;
