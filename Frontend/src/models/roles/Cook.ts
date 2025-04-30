import { Employee } from '../Employee'

export class Cook extends Employee {
  constructor(id: number, idEnterprise: number, name: string, surname: string, email: string, token: string) {
    super (id, idEnterprise, name, surname, email, 'Cozinheiro', token)
  }

  canAccessEmployeePanel(): boolean { return true }
  canEditMenu() { return true }
}