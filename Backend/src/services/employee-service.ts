import { Employee } from '../repositories/employee'
import { Salary } from '../repositories/salary'
import { getEmployeePhoto } from '../repositories/user-photo'
import { refreshToken } from './authenticator'
import { TokenService } from './token-service'

export class EmployeeService {
  
  static async addEmployee(email: string, role: string, token: string) {
    const id_enterprise = await TokenService.queryEnterpriseId(token)

    const existing = await Employee.findOne({ where: { email, id_enterprise } })
    if (existing) {
      throw new Error('Funcionário já cadastrado nesta empresa.')
    }

    role = role.toLowerCase()

    const newEmployee = await Employee.create({
      email,
      role,
      id_enterprise,
      name: '',
      surname: '',
      password: '',
    })

    return newEmployee
  }

  static async getEmployees(token: string) {
    try {
      const id_enterprise = await TokenService.queryEnterpriseId(token)

      const user = await Employee.findOne({
        where: { token, id_enterprise },
        attributes: ['id'],
      })

      if (!user) {
        return { success: false, message: 'Empresa não encontrada ou token inválido.' }
      }

      const employees = await Employee.findAll({
        where: { id_enterprise },
        attributes: [
          'id',
          'email',
          'name',
          'surname',
          'start_of_contract',
          'end_of_contract',
          'role',
          'telefone',
          'endereco'
        ],
        include: [
          {
            model: Salary,
            as: 'salary',
            attributes: ['amount', 'updated_at'],
          },
        ],
      })

      const employeesWithPhotos = await Promise.all(
        employees.map(async (employee) => {
          const employeeData = employee.toJSON()
          const photoResult = await getEmployeePhoto(employeeData.id)

          return {
            ...employeeData,
            photo: photoResult.exists ? photoResult.photo : null,
            hasPhoto: photoResult.exists
          }
        })
      )

      if (!employees || employees.length === 0) {
        return { success: false, message: 'Empresa não encontrada ou token inválido.' }
      }

      const newToken = await refreshToken(token)
      if (!newToken.success) {
        return { success: false, status: 401 }
      }

      return { success: true, token: newToken.token, employees: employeesWithPhotos }

    } catch (error: any) {
      return { success: false, message: error.message || 'Employee not found' }
    }
  }

  static async deleteEmployee(email: string, token: string) {
    const id_enterprise = await TokenService.queryEnterpriseId(token)
    await Employee.destroy({
      where: { email, id_enterprise }
    })
  }

  static async editEmployee(
    email: string,
    token: string,
    updates: Partial<Pick<Employee, 'name' | 'surname' | 'role'>>
  ) {
    const id_enterprise = await TokenService.queryEnterpriseId(token)
    await Employee.update(updates, {
      where: { email, id_enterprise }
    })

    return await Employee.findOne({ where: { email, id_enterprise } })
  }
}
