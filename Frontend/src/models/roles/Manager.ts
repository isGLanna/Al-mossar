import { Employee } from '../Employee'

export class Manager extends Employee {
  constructor (idEnterprise: number,name: string, surname: string, email: string, token: string) {
    super (idEnterprise, name, surname, email, 'gerente', token)
  }

  canViewMenuDescription() { return true }
  canViewPayroll() { return true }
  canAccessEmployeePanel() { return true }
  canEditSalary() { return true }
  canViewSalary() { return true }
  canViewFoodExpenses() { return true }
  canViewUserExpenses() { return true }
}