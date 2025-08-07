import { Employee } from '../repositories/employee'
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
    // Confirmar se o id da empresa condiz com o token
    const id_enterprise_arr = await Employee.findOne({
      where: { token, id_enterprise },
      attributes: ['id_enterprise'],
    })

    if (!id_enterprise_arr) {
      return { success: false, message: 'Empresa não encontrada.' }
    }

    const employees = await Employee.findAll({
      where: { id_enterprise: id_enterprise },
      attributes: ['email', 'name', 'surname', 'role']
    })

    const newToken = await refreshToken(token)

    if (!newToken.success) {
      return { success: false, message: newToken.message || 'Erro ao atualizar token.' }
    }

    return { success: true, token : newToken.token, employees}
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
