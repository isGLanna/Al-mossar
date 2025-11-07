import express from 'express'
import cors from 'cors'
import routes from './routes/index'
import https from 'https'
import fs from 'fs'

const app = express()
const PORT = process.env.NODE_ENV === 'production' ? 443 : 3000

app.use(express.json())
app.use(cors())
app.use('/api', routes)

if (process.env.NODE_ENV === 'production') {
  const sslOptions = {
    key: fs.readFileSync('certificates/server.key'),
    cert: fs.readFileSync('certificates/server.cert'),
  }

  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Servidor HTTPS rodando em https://0.0.0.0:${PORT}`)
  })
} else {
  const sslOptions = {
    key: fs.readFileSync('certificates/server.key'),
    cert: fs.readFileSync('certificates/server.cert'),
  }

  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log(`Servidor HTTP rodando em http://localhost:${PORT}`)
  })
}
