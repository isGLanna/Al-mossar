import bcrypt from 'bcrypt'
import { Employee } from '../models/employee'
import { Enterprise } from '../models/enterprise'

export const authenticateRegister = async (
  name: string,
  surname: string,
  email: string,
  password: string,
  id_enterprise: number,
  start_of_contract: Date
) => {
  try {
    // Verifica se a empresa existe
    const enterprise = await Enterprise.findOne({ where: { id: id_enterprise } })
    if (!enterprise) {
      return { success: false, message: 'Empresa não encontrada.' }
    }

    // Verifica se existe um e-mail já autorizado (pré-cadastrado) para essa empresa
    const employee = await Employee.findOne({
      where: { email, id_enterprise }
    })

    if (!employee) {
      return { success: false, message: 'E-mail não autorizado para cadastro.' }
    }

    // Se o usuário já completou o cadastro (nome, sobrenome ou senha já existem), bloqueia
    if (employee.name && employee.surname && employee.password) {
      return { success: false, message: 'Usuário já está registrado.' }
    }

    // Valida domínio do e-mail
    const allowedDomains = ['gmail.com', 'outlook.com', 'icloud.com', 'yahoo.com']
    const domain = email.split('@')[1]
    if (!allowedDomains.includes(domain)) {
      return { success: false, message: 'Domínio de e-mail inválido.' }
    }

    // Validação de nome e sobrenome
    if (!name.trim() || name.length > 16 || !surname.trim() || surname.length > 48) {
      return { success: false, message: 'Nome ou sobrenome fora do padrão.' }
    }

    // Validação da senha
    if (password.length < 4 || password.length > 16) {
      return { success: false, message: 'Senha fora do padrão.' }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Atualiza o registro do pré-cadastro com os dados finais
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
