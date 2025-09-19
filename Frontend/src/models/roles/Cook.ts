import { Employee } from '../Employee'

export class Cook extends Employee {
  constructor(name: string, surname: string, email: string) {
    super (name, surname, email, 'Cozinheiro')
  }

  canAccessEmployeePanel(): boolean { return true }
  canEditMenu() { return true }
}