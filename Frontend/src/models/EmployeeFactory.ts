// src/factories/EmployeeFactory.ts

import { Administrator } from './roles/Administrator.ts';
import { Manager } from './roles/Manager.ts';
import { Cook } from './roles/Cook';
import { Customer } from './roles/Customer.ts'
import { GenericEmployee } from './roles/GenericEmployee.ts'
import { Employee } from './Employee';

export function createEmployee(id: number, idEnterprise: number, email: string, name: string, surname: string, role: string, token: string ): Employee {
  switch (role) {
    case 'Administrador':
      return new Administrator(id, idEnterprise, name, surname, email, token)
    case 'Gerente':
      return new Manager(id, idEnterprise, name, surname, email, token)
    case 'Cozinheiro':
      return new Cook(id, idEnterprise, name, surname, email, token)
    case 'Cliente':
      return new Customer(id, idEnterprise, name, surname, email, role, token)
    default:
      return new GenericEmployee(id, idEnterprise, name, surname, email, role, token)
  }
}
