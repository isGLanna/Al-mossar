import { Router } from 'express'
import { EmployeeController } from '../controllers/employee-controller'
import { EmployeeService } from '../services/employee-service'
import { authenticate, authorizeRoles } from '../middlewares/auth-middleware'

const employeeRouter = Router()
const controller = new EmployeeController(new EmployeeService())

employeeRouter.use(authenticate)

employeeRouter.get('/employee', authorizeRoles('administrador', 'gerente'), (req, res, next) => controller.listEmployees(req, res, next))
employeeRouter.post('/employee', authorizeRoles('administrador', 'gerente'), (req, res, next) => controller.create(req, res, next))
employeeRouter.delete('/employee/:enterpriseId/:id', authorizeRoles('administrador', 'gerente'), (req, res, next) => controller.deleteEmployee(req, res, next))
employeeRouter.patch('/employee/:enterpriseId/:id', authorizeRoles('administrador', 'gerente'), (req, res, next) => controller.update(req, res, next))

export default employeeRouter
