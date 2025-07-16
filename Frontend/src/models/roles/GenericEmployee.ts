// src/models/roles/GenericEmployee.ts

import { Employee } from '../Employee';

export class GenericEmployee extends Employee {
  constructor(idEnterprise: number,name: string, surname: string, email: string, role: string, token: string
  ) {
    super(idEnterprise, name, surname, email, role, token);
  }

  canAccessEmployeePanel(): boolean { return true }
  canEditMenu() { return false }
  canViewPayroll() { return false }
  canEditSalary(){ return false }
  canViewSalary(){ return false }
  canViewFoodExpenses() { return false }
  canViewUtilityExpenses() { return false }
}
