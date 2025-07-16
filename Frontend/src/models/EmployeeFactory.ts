// src/factories/EmployeeFactory.ts

import { Administrator } from './roles/Administrator.ts';
import { Manager } from './roles/Manager.ts';
import { Cook } from './roles/Cook';
import { Customer } from './roles/Customer.ts'
import { Nutritionist } from './roles/Nutricionist.ts';
import { GenericEmployee } from './roles/GenericEmployee.ts'
import { Employee } from './Employee';

export function createEmployee(idEnterprise: number, email: string, name: string, surname: string, role: string, token: string ): Employee {
  switch (role) {
    case 'administrador':
      return new Administrator(idEnterprise, name, surname, email, token)
    case 'gerente':
      return new Manager(idEnterprise, name, surname, email, token)
    case 'cozinheiro':
      return new Cook(idEnterprise, name, surname, email, token)
    case 'cliente':
      return new Customer(idEnterprise, name, surname, email, role, token)
    case 'nutricionista':
      return new Nutritionist(idEnterprise, name, surname, email, role, token)
    default:
      return new GenericEmployee(idEnterprise, name, surname, email, role, token)
  }
}
