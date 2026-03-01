import { Employee } from '../repositories/user/employee'
import { Salary } from '../repositories/salary'
import { getUserPhoto } from './user-photo'
import { AppError } from '../utils/app-error';

export class EmployeeService {

  async create(email: string, role: string, enterprise_id: number) {
    const existing = await Employee.findOne({ where: { email, enterprise_id } })
    
    if (existing) throw new AppError('Funcionário já cadastrado nesta empresa.', 409)

    return await Employee.create({
      email,
      role,
      enterprise_id,
      name: '',
      surname: '',
      password: '',
    })
  }

  async getEmployees(enterprise_id: number) {
    const employees = await Employee.findAll({
      where: { enterprise_id },
      attributes: ['id', 'email', 'name', 'surname', 'role', 'telephone'],
      include: {
        model: Salary,
        as: 'salary',
        attributes: ['salary', 'updated_at']
      }
    })

    if (!employees.length) throw new AppError('Nenhum funcionário encontrado.', 404)

    const employeesWithPhotos = await Promise.all(
      employees.map(async (employee) => {
        const employeeData = employee.toJSON()
        const photoResult = await getUserPhoto(employeeData.id, 'employee')

        return {
          ...employeeData,
          photo: photoResult.exists ? photoResult.photo : null,
          hasPhoto: photoResult.exists
        }
      })
    )

    return { success: true, employees: employeesWithPhotos }
  }

  async deleteEmployee(id: number, enterprise_id: number) {
    const deletedCount = await Employee.destroy({
      where: {id, enterprise_id}
    })

    if (deletedCount === 0) throw new AppError('Funcionário não encontrado', 404)
  }

  async update(id: number, enterprise_id: number, updates: Partial<Employee>) {
    const [updateCount, updatedRows] = await Employee.update(updates, {
      where: { id, enterprise_id },
      returning: true
    })

    if (updateCount === 0) throw new AppError('Funcionário não encontrado', 404)
    return updatedRows[0]
  }
}
