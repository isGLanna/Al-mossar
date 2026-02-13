import { Router } from 'express'
import { login } from '../controllers/auth-controller'
import { RegisterEntity } from '../controllers/register-entity-controller'
import { RegisterEntityService } from '../services/register-entity-service'

const authRouter = Router()

const service = new RegisterEntityService()
const controller = new RegisterEntity(service)

authRouter.post('/login', login)
authRouter.post('/tokenLogin', (req, res) => controller.tokenLogin(req, res))
authRouter.post('/register', (req, res) => controller.registerUser(req, res))
authRouter.post('/registerEnterprise', (req, res) => controller.registerEnterprise(req, res))

export default authRouter