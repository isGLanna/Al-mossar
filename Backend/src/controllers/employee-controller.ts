import { Request, Response, NextFunction } from 'express'
import {EmployeeService} from '../services/employee-service'
import { authorizeEmployee } from '../validations/auth.schemas'
import { editEmployeeSchema } from '../validations/employee.schemas'


export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  // Apenas registra o e-mail dos usuários que podem se cadastrar na empresa
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, role, enterprise_id } = authorizeEmployee.parse(req.body)
      await this.employeeService.create(email, role, enterprise_id)
      res.status(201).json({ success: true })
    } catch (error) {
      next(error)
    }
  }

  async listEmployees(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const enterpriseId = Number(req.params.enterpriseId)

      const employees = await this.employeeService.getEmployees(enterpriseId)

      res.status(200).json(employees)
    } catch (error) {
      next(error)
    }
  }

  async deleteEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id)
      const enterpriseId = Number(req.params.enterpriseId)

      await this.employeeService.deleteEmployee(id, enterpriseId)
      res.status(204).send()

    } catch (error) {
      next(error)
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = Number(req.params.id)
      const enterpriseId = Number(req.params.enterpriseId)
      const updates = editEmployeeSchema.parse(req.body)

      await this.employeeService.update(id, enterpriseId, updates)
      res.status(200).send()

    } catch (error) {
      next(error)
    }
  }
}
