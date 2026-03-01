import { Router } from 'express'
import { MenuService } from '../services/menu-service'
import { MenuController } from '../controllers/menu-controller'
import { authorizeRoles, authenticate } from '../middlewares/auth-middleware'

const menuRouter = Router()
const service = new MenuService()
const controller = new MenuController(service)

menuRouter.use(authenticate)

menuRouter.get('/menu', authorizeRoles('*'), (req, res) => { controller.get})
menuRouter.post('/menu', authorizeRoles('admin', 'cozinheiro', 'auxiliar de cozinha'), (req, res) => { controller.create})
menuRouter.put('/menu', authorizeRoles('admin', 'cozinheiro', 'auxiliar de cozinha'), (req, res) => { controller.update})
menuRouter.delete('/menu',authorizeRoles('admin', 'cozinheiro', 'auxiliar de cozinha'), (req, res) => { controller.delete})

export default menuRouter