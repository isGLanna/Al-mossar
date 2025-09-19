import { Employee } from '../Employee'

export class Manager extends Employee {
  constructor (name: string, surname: string, email: string) {
    super (name, surname, email, 'gerente')
  }

  canViewMenuDescription() { return true }
  canViewPayroll() { return true }
  canAccessEmployeePanel() { return true }
  canEditSalary() { return true }
  canViewSalary() { return true }
  canViewFoodExpenses() { return true }
  canViewUserExpenses() { return true }
}