// src/models/Employee.ts

export type employees = {
  name: string,
  surname: string,
  role: string
} []

export abstract class Employee {
  constructor(
    public id: number,
    public idEnterprise: number,
    public name: string,
    public surname: string,
    public email: string,
    public role: string,
    public employees: { name: string; surname: string; role: string }[],
    public token: string
  ) {}

  canViewMenuDescription(): boolean {
    return true;
  }

  canEditMenu(): boolean {
    return false;
  }

  canAccessEmployeePanel(): boolean {
    return false
  }

  canViewPayroll(): boolean {
    return false;
  }

  canEditSalary(): boolean {
    return false;
  }

  canViewExpenses(): boolean {
    return false;
  }

  canViewFoodExpenses(): boolean {
    return false;
  }

  canViewUtilityExpenses(): boolean {
    return false;
  }

  getEmployees(): employees {
    return this.employees
  }

  getToken(): string {
    return this.token
  }

  getId(): number {
    return this.id
  }
}
