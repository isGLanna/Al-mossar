// src/models/Employee.ts

export abstract class Employee {
  constructor(
    public id: number,
    public idEnterprise: number,
    public name: string,
    public surname: string,
    public email: string,
    public role: string,
    public token: string
  ) {}

  canViewMenuDescription(): boolean {
    return false;
  }

  canEditMenu(): boolean {
    return false;
  }

  canAccessEmployeePanel(): boolean {
    return false
  }

  canEditEmployeePanel(): boolean {
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

  haveProfile(): boolean {
    return true
  }

  getToken(): string {
    return this.token
  }

  getId(): number {
    return this.id
  }

  getIdEnterprise(): number {
    return this.idEnterprise
  }
}
