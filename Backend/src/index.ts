import { config } from 'dotenv'
import 'express-async-errors'
import helmet from 'helmet'
import express from 'express'
import session from 'cookie-session'
import cors from 'cors'
import routes from './routes/index'
import rateLimit from 'express-rate-limit'
import { errorHandler } from './middlewares/error-handler'

config()
const app = express()

// This function should be reclaced by a native method for avoid dependency on external libraries
const limiter = rateLimit({
  windowMs: 10 * 1000, // 10 seconds
  limit: 100,
  message: { message: 'Muitas solicitações feitas em período curto.'}
})
// Secure cookies in production
const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // validate for 1 
app.use(session({
  name: 'session',
  keys: [process.env.SESSION_KEY_1 || 'default-key-1', process.env.SESSION_KEY_2 || 'default-key-2'],
  secure: process.env.NODE_ENV === 'production',
  httpOnly: true,
  domain: process.env.NODE_ENV === 'production' ? 'https://almossar-git-main-isglannas-projects.vercel.app/' : 'localhost',
  expires: expiryDate,
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
}))
const PORT = Number(process.env.PORT) || 3000

app.use(express.json())
app.use(helmet())
app.use(cors())

app.use('/api', routes, limiter)
app.use(errorHandler)
app.disable('x-powered-by')


app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`)
})

