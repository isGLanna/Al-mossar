import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Usando as rotas
app.use('/auth', authRoutes);
app.use('user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor operacional rodando porta ${PORT}`));

