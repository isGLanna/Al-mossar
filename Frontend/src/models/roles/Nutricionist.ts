import { Employee } from '../Employee'

export class Nutritionist extends Employee {
  constructor (name: string, surname: string, email: string, role: string) {
    super (name, surname, email, role)
  }

  canViewMenuDescription() { return true }
  canViewPayroll() { return true }
  canAccessEmployeePanel() { return true }
  canEditSalary() { return true }
  canViewSalary() { return true }
  canViewFoodExpenses() { return true }
  canViewUserExpenses() { return true }
  canViewMenuCalories() { return true }
}