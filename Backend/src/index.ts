import express from 'express'
import cors from 'cors'
import routes from './routes/index'
import https from 'https'
import fs from 'fs'

const sslOptions = {
  key: fs.readFileSync('certificates/server.key'),
  cert: fs.readFileSync('certificates/server.crt'),
}

const app = express()
const PORT = 443

app.use(express.json())
app.use(cors())
app.use('/api', routes)

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Servidor HTTPS rodando em https://0.0.0.0:${PORT}`)
})
