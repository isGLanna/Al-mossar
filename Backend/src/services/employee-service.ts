import { Employee } from '../repositories/employee'
import { Salary } from '../repositories/salary'
import { getEmployeePhoto } from '../repositories/employee-photo'
import { refreshToken } from './authenticator'

export async function addEmployee(email: string, role: string, id_enterprise: number) {
  const existing = await Employee.findOne({ where: { email, id_enterprise } })

  if (existing) {
    throw new Error('Funcionário já cadastrado nesta empresa.')
  }

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

export async function getEmployees(token: string, id_enterprise: number) {
  try {
    const user = await Employee.findOne({
      where: { token, id_enterprise },
      attributes: ['id'],
    })

    if (!user) {
      return { success: false, message: 'Empresa não encontrada ou token inválido.' }
    }

    // Confirmar se o id da empresa condiz com o token
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

    // Consulta e processa fotos dos empregados
    const employeesWithPhotos = await Promise.all(
      employees.map(async (employee) => {
        const employeeData = employee.toJSON()
        const photoResult = await getEmployeePhoto(employeeData.id)

        console.log(photoResult.exists)

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

    return { success: true, token : newToken.token, employees: employeesWithPhotos }
  } catch (error: any) {
    return { success: false, message: error.message || 'Employee not found'}
  }
}

export async function deleteEmployee(email: string, id_enterprise: number) {
  await Employee.destroy({
    where: { email, id_enterprise }
  })
}

export async function editEmployee(
  email: string,
  id_enterprise: number,
  updates: Partial<Pick<Employee, 'name' | 'surname' | 'role'>>
) {
  await Employee.update(updates, {
    where: { email, id_enterprise }
  })

  return await Employee.findOne({ where: { email, id_enterprise } })
}
