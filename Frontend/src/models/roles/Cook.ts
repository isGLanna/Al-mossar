import { Employee, employees } from '../Employee'

export class Cook extends Employee {
  constructor(id: number, idEnterprise: number, name: string, surname: string, email: string, employees: employees, token: string) {
    super (id, idEnterprise, name, surname, email, 'Cozinheiro', employees, token)
  }

  canAccessEmployeePanel(): boolean { return true }
  canEditMenu() { return true }
}