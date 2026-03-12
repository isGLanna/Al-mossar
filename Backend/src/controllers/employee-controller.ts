import { Request, Response, NextFunction } from 'express'
import {EmployeeService} from '../services/employee-service'
import { authorizeEmployee } from '../validations/auth.schemas'
import { editEmployeeSchema } from '../validations/employee.schemas'


export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  // Apenas registra o e-mail dos usuários que podem se cadastrar na empresa
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { email, role, enterpriseId } = authorizeEmployee.parse(req.body)
    await this.employeeService.create(email, role, enterpriseId)
    res.status(201).json({ success: true })

  }

  async listEmployees(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.user) throw new Error('Usuário não autenticado')
    const enterpriseId = req.user.enterpriseId

    const employees = await this.employeeService.getEmployees(enterpriseId)

    res.status(200).json(employees)
  }

  async deleteEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = Number(req.params.id)

    if (!req.user) throw new Error('Usuário não autenticado')
    const enterpriseId = req.user.enterpriseId

    await this.employeeService.deleteEmployee(id, enterpriseId)
    res.status(204).send()
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id = Number(req.params.id)
    const updates = editEmployeeSchema.parse(req.body)

    if (!req.user) throw new Error('Usuário não autenticado')
    const enterpriseId = req.user.enterpriseId

    await this.employeeService.update(id, enterpriseId, updates)
    res.status(200).send()
  }
}
