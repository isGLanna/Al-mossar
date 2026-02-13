import { Enterprise } from '../repositories/enterprise'
import { Employee } from '../repositories/user/employee'
import { CreateEnterpriseInput, RegisterUserInput } from '../types/auth.schemas'
import { AppError } from '../utils/app-error'
import bcrypt from 'bcrypt'

interface ServiceResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export class RegisterEntityService{

  async createEnterprise(data: CreateEnterpriseInput): Promise<{ id: number }> {
    const { name, email, password, employees} = data

    const exists = await Enterprise.findOne({ where: { name }})
    if(exists) { throw new AppError("E-mail já cadastrado como empresa ou funcionário.", 409)}

    const hashedPassword = await bcrypt.hash(password, 10)

    const enterprise = await Enterprise.create({ name })

    await Employee.create({
      email,
      name,
      surname: '',
      password: hashedPassword,
      role: 'Administrador',
      id_enterprise: enterprise.id
    })

    if (employees && employees.length > 0) {
      const authorizedEmails = employees.map((emp) => ({
        email: emp.email,
        role: emp.role,
        id_enteprise: enterprise.id
      }))

      await Employee.bulkCreate(authorizedEmails)
    }

    return { id: enterprise.id }
  }

  async registerUser(data: RegisterUserInput) {
    const { name, surname, email, password, id_enterprise, start_of_contract } = data

    const enterprise = await Enterprise.findByPk(id_enterprise);
    if (!enterprise) {
      throw new AppError('Empresa não encontrada.', 404);
    }

    const employee = await Employee.findOne({ where: { email, id_enterprise } });
    
    if (!employee) {
      throw new AppError('E-mail não autorizado para cadastro nesta empresa.', 403);
    }

    if (employee.name && employee.password) {
      throw new AppError('Usuário já está registrado.', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await employee.update({
      name,
      surname,
      password: hashedPassword,
      start_of_contract
    });
  }

  async getProfileByToken(token: string) {
    const employee = await Employee.findOne({
      where: {token},
      attributes: ['name', 'surname', 'role', 'id_enterprise']
    })

    if(!employee) throw new AppError("Employee not found.", 401)

      const employees = await Employee.findAll({
        where: {id_enterprise: employee.id_enterprise},
        attributes: ['name', 'surname', 'role']
      })

    return {
      name: employee.name,
      surname: employee.surname,
      idEnterprise: employee.id_enterprise,
      role: employee.role,
      token,
      employees
    }
  }
}