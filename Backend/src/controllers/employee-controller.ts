import { Request, Response, NextFunction } from 'express'
import {EmployeeService} from '../services/employee-service'
import { authorizeEmployee } from '../validations/auth.schemas'
import { employeeSchema, editEmployee } from '../validations/employee.schemas'


export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  // Apenas registra o e-mail dos usuários que podem se cadastrar na empresa
  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, role, enterprise_id } = authorizeEmployee.parse(req.body)
      await this.employeeService.create(email, role, enterprise_id)
      res.status(201).json({ success: true })
    } catch (error: any) {
      const status = error.status || 500
      const message = error.message || "Falha inexperada ao adicionar novo empregado."

      res.status(status).json({ error: message })
    }
  }

  async listEmployees(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const enterprise_id = req.user!.enterprise_id
      const employees = await this.employeeService.getEmployees(enterprise_id)

      res.status(200).json(employees)
    } catch (error) {
      next(error)
    }
  }

  async deleteEmployee(req: Request, res: Response): Promise<void> {
    const { id, enterprise_id } = req.query

      await this.employeeService.deleteEmployee(id, enterprise_id)
      res.status(204).json({ success: true, message: ''})

      return 
    } catch (error: any) {
      const status = error.status || 500
      const message = error.message || 'Erro interno ao remover empregado.'
      res.status(status).json({ success: false, message: message })
      return
    }
  }

  async editEmployee(req: Request, res: Response): Promise<void> {
    const { id, enterprise_id, name, surname, role } = req.body

    try {
      await this.employeeService.editEmployee(id, enterprise_id, { name, surname, role })
      res.status(200).json({ success: true, message: '' })

    } catch (error: any) {
      const status = error.status || 500
      const message = error.message || 'Erro interno ao editar funcionário.'

      res.status(status).json({ success: false, message })
    }
  }
}
