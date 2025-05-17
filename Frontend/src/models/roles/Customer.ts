// src/models/roles/Client.ts

import { Employee } from '../Employee';

export class Customer extends Employee {
  constructor(id: number, idEnterprise: number, name: string, surname: string, email: string, role: string, token: string
  ) {
    super(id, idEnterprise, name, surname, email, role, token);
  }

  canAccessEmployeePanel(): boolean { return false }
  canEditMenu() { return false }
  canViewPayroll() { return false }
  canEditSalary(){ return false }
  canViewSalary(){ return false }
  canViewFoodExpenses() { return false }
  canViewUtilityExpenses() { return false }
  haveProfile() { return false }

}
