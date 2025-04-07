import { Router } from 'express'
import { login, registerUser } from '../controllers/auth-controller'

const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/register', registerUser)

export default authRouter
