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

dishRouter.post("/dishes", authorizeRoles(...kitchenStaff), (req, res) => { controller.createDish })
dishRouter.get("/dishes", authorizeRoles("*"), (req, res) => { controller.getAll })
dishRouter.patch("/dishes", authorizeRoles(...kitchenStaff), (req, res) => { controller.updateDish })
dishRouter.delete("/delete", authorizeRoles(...kitchenStaff))