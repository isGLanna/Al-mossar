import { Router } from 'express'
import { MenuService } from '../services/menu-service'
import { MenuController } from '../controllers/menu-controller'
import { authorizeRoles, authenticate } from '../middlewares/auth-middleware'

const menuRouter = Router()
const service = new MenuService()
const controller = new MenuController(service)
const kitchenStaff = [
  'admin',
  'cozinheiro',
  'nutricionista',
  'auxiliar de cozinha'
]

menuRouter.use(authenticate)

menuRouter.post('/menus', authorizeRoles(...kitchenStaff), (req, res) => { controller.create(req, res)})
menuRouter.put('/menus', authorizeRoles(...kitchenStaff), (req, res) => { controller.replace(req, res)})
menuRouter.post('/menus/:menuId/dishes', authorizeRoles(...kitchenStaff), (req, res) => { controller.insert(req, res)})
menuRouter.get('/menus/:day', authorizeRoles('*'), (req, res) => { controller.getMenuByDate(req, res)})
menuRouter.delete('/menus/:menuId/dishes/:id', authorizeRoles(...kitchenStaff), (req, res) => { controller.delete(req, res)})
menuRouter.delete('/menus',authorizeRoles(...kitchenStaff), (req, res) => { controller.deleteBeforeThat(req, res)})

export default menuRouter