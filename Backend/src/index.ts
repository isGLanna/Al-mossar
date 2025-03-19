import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'

const app = express()
const PORT = 3001

app.use(express.json())
app.use(cors())

app.use('/api', authRoutes)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})