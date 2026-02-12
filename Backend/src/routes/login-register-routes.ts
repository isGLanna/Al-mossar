import { Router } from 'express'
import { login, registerUser, tokenLogin } from '../controllers/auth-controller'
import { registerEnterprise } from '../controllers/enterprise-controller'

const authRouter = Router()

authRouter.get('/token-login', tokenLogin)
authRouter.post('/login', login)
authRouter.post('/register', registerUser)
authRouter.post('/registerEnterprise', registerEnterprise)

export default authRouter
