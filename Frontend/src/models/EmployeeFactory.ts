// src/factories/EmployeeFactory.ts

import { Administrator } from './roles/Administrator.ts';
import { Manager } from './roles/Manager.ts';
import { Cook } from './roles/Cook';
import { GenericEmployee } from './roles/GenericEmployee.ts'
import { Employee } from './Employee';

export function createEmployee(id: number, idEnterprise: number, email: string, name: string, surname: string, role: string, token: string ): Employee {
  switch (role) {
    case 'administrador':
      return new Administrator(id, idEnterprise, name, surname, email, token)
    case 'gerente':
      return new Manager(id, idEnterprise, name, surname, email, token)
    case 'cozinheiro':
      return new Cook(id, idEnterprise, name, surname, email, token)
    default:
      return new GenericEmployee(id, idEnterprise, name, surname, email, role, token)
  }
}
