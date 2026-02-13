import express from 'express'
import cors from 'cors'
import routes from './routes/index'

const app = express()
const PORT = process.env.NODE_ENV === 'production' ? 443 : 3000

app.use(express.json())
app.use(cors())
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Conexão com backend: ${PORT}`)
})