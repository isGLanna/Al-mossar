import { Router } from 'express'
import { login, registerUser } from '../controllers/auth-controller'
import { registerEnterprise } from '../controllers/enterprise-controller'

const authRouter = Router()

authRouter.post('/login', login)
authRouter.post('/register', registerUser)
authRouter.post('/registerEnterprise', registerEnterprise)

export default authRouter
