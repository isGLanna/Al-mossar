// src/factories/EmployeeFactory.ts

import { Administrator } from './roles/Administrator.ts';
import { Manager } from './roles/Manager.ts';
import { Cook } from './roles/Cook';
import { Customer } from './roles/Customer.ts'
import { Nutritionist } from './roles/Nutricionist.ts';
import { GenericEmployee } from './roles/GenericEmployee.ts'
import { Employee } from './Employee';

export function createEmployee(email: string, name: string, surname: string, role: string): Employee {
  switch (role) {
    case 'administrador':
      return new Administrator(name, surname, email)
    case 'gerente':
      return new Manager(name, surname, email)
    case 'cozinheiro':
      return new Cook(name, surname, email)
    case 'cliente':
      return new Customer(name, surname, email, role)
    case 'nutricionista':
      return new Nutritionist(name, surname, email, role)
    default:
      return new GenericEmployee(name, surname, email, role)
  }
}
