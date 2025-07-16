import { Employee } from '../repositories/employee'
import { Op } from 'sequelize'

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
    password: '', // ou null se preferir
  })

  return newEmployee
}

export async function getEmployees(id_enterprise: number) {
  return await Employee.findAll({
    where: { id_enterprise },
    attributes: ['email', 'name', 'surname', 'role']
  })
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
