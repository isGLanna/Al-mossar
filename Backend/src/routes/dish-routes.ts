import { Router } from 'express'
import { DishController } from '../controllers/dish-controller'
import { DishService } from '../services/dish-service'
import { authenticate, authorizeRoles } from '../middlewares/auth-middleware'

const dishRouter = Router()
const service = new DishService()
const controller = new DishController(service)

const kitchenStaff = [
  'admin',
  'cozinheiro',
  'nutricionista',
  'auxiliar de cozinha'
]

dishRouter.use(authenticate)

dishRouter.post('/dishes', authorizeRoles(...kitchenStaff), (req, res) => { controller.createDish(req, res) })
dishRouter.get('/dishes', authorizeRoles('*'), (req, res) => { controller.getAll(req, res) })
dishRouter.get('/dishes/unused', authorizeRoles('*'), (req, res) => { controller.getUnusedDishes(req, res) })
dishRouter.patch('/dishes', authorizeRoles(...kitchenStaff), (req, res) => { controller.updateDish(req, res) })
dishRouter.delete('/dishes', authorizeRoles(...kitchenStaff), (req, res) => { controller.deleteDish(req, res) })

export default dishRouter