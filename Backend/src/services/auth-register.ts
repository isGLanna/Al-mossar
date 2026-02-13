import bcrypt from 'bcrypt'
import { Employee } from '../repositories/user/employee'
import { Enterprise } from '../repositories/enterprise'

export const authenticateRegister = async (
  name: string,
  surname: string,
  email: string,
  password: string,
  id_enterprise: number,
  start_of_contract: Date
) => {
  try {
    const enterprise = await Enterprise.findOne({ where: { id: id_enterprise } })
    if (!enterprise) {
      return { success: false, message: 'Empresa não encontrada.' }
    }

    const employee = await Employee.findOne({
      where: { email, id_enterprise }
    })

    if (!employee) {
      return { success: false, message: 'E-mail não autorizado para cadastro.' }
    }

    if (employee.name && employee.surname && employee.password) {
      return { success: false, message: 'Usuário já está registrado.' }
    }

    const allowedDomains = ['gmail.com', 'outlook.com', 'icloud.com', 'yahoo.com']
    const domain = email.split('@')[1]
    if (!allowedDomains.includes(domain)) {
      return { success: false, message: 'Domínio de e-mail inválido.' }
    }

    if (!name.trim() || name.length > 16 || !surname.trim() || surname.length > 48) {
      return { success: false, message: 'Nome ou sobrenome fora do padrão.' }
    }

    if (password.length < 4 || password.length > 16) {
      return { success: false, message: 'Senha fora do padrão.' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await employee.update({
      name,
      surname,
      password: hashedPassword,
      start_of_contract
    })

    console.log('Usuário registrado com sucesso.')
    return { success: true }

  } catch (error) {
    console.error(error)
    return { success: false, message: 'Erro ao registrar usuário.' }
  }
}
