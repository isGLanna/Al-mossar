import { Router } from 'express'
import { addEmployee, getEmployees, deleteEmployee, editEmployee } from '../controllers/employee-controller'

const employeeRouter = Router()

employeeRouter.post('/employee', addEmployee)
employeeRouter.get('/employee', getEmployees)
employeeRouter.delete('/:email', deleteEmployee)
employeeRouter.put('/:email', editEmployee)

export default employeeRouter
