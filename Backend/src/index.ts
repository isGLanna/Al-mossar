import express from 'express'
import cors from 'cors'
import routes from './routes'
import https from 'https'
import fs from 'fs'

const app = express()
const PORT = 3001

app.use(express.json())
app.use(cors())

app.use('/api', routes)

const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}

https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em https://0.0.0.0:${PORT}`)
})