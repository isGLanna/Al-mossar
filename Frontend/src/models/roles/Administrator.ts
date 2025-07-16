import { Employee } from '../Employee'

export class Administrator extends Employee {
  constructor (idEnterprise: number,name: string, surname: string, email: string, token: string) {
    super(idEnterprise, name, surname, email, 'Administrador', token);
  }

  canViewMenuDescription(): boolean { return true }
  canEditMenu(): boolean { return true }

  canAccessEmployeePanel(): boolean { return true }
  canEditEmployeePanel(): boolean { return true }
  
  canViewPayroll(): boolean { return true }
  canEditSalary(): boolean { return true}
  canViewSalary(): boolean { return true }
  canViewFoodExpense(): boolean { return true }
  canViewUtilise(): boolean { return true }
}
