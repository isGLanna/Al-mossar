import { Employee } from '../Employee'

export class Nutritionist extends Employee {
  constructor (idEnterprise: number,name: string, surname: string, email: string, role: string,token: string) {
    super (idEnterprise, name, surname, email, role, token)
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