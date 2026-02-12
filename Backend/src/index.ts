import { config } from 'dotenv'
config()

import express from 'express'
import cors from 'cors'
import routes from './routes/index'

const app = express()
const PORT = Number(process.env.PORT) || 4000

app.use(express.json())
app.use(cors())
app.use('/api', routes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
