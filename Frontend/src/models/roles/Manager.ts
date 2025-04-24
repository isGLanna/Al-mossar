import { Employee, employees } from '../Employee'

export class Manager extends Employee {
  constructor (id: number, idEnterprise: number, name: string, surname: string, email: string, employees: employees, token: string) {
    super (id, idEnterprise, name, surname, email, 'Gerente', employees, token)
  }

  canViewMenuDescription() { return true }
  canViewPayroll() { return true }
  canAccessEmployeePanel() { return true }
  canEditSalary() { return true }
  canViewSalary() { return true }
  canViewFoodExpenses() { return true }
  canViewUserExpenses() { return true }
}