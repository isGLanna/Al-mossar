import express from 'express'
import cors from 'cors'
import routes from './routes'

const app = express()
const PORT = 3001

app.use(express.json())
app.use(cors())

app.use('/api', routes)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://0.0.0.0:${PORT}`)
})