// src/models/Employee.ts

export abstract class Employee {
  telefone?: string = '';
  endereco?: string = '';
  start_of_contract?: Date | null = null;
  end_of_contract?: Date | null = null;
  photo?: string | null = null;
  hasPhoto?: boolean = false;
  salary?: {
    amount: number;
    updated_at: Date;
  };

  constructor(
    public idEnterprise: number,
    public name: string,
    public surname: string,
    public email: string,
    public role: string,
    public token: string,
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

  canViewMenuCalories(): boolean {
    return false;
  }

  haveProfile(): boolean {
    return true
  }

  getIdEnterprise(): number {
    return this.idEnterprise
  }
}
