import { Enterprise } from '../models/enterprise'
import { Employee } from '../models/employee'
import bcrypt from 'bcrypt'

// Formato de input/output
interface EnterpriseData {
  name: string
  email: string
  password: string
  employees: {
    email: string,
    role: string
  }[]
}

interface RegisterResult {
  success: boolean
  id?: number
  message?: string
}

export async function createEnterprise(data: EnterpriseData): Promise<RegisterResult> {
  const { name, email, password, employees } = data

  // Validação dos dados
  if (!name || !email || !password) {
    return { success: false, message: 'Campos obrigatórios não preenchidos.' }
  }

  // Verifica nome da empresa
  if (name.trim().length < 3 || name.length > 32) {
    return { success: false, message: 'Nome deve ter entre 3 e 32 caracteres.' }
  }

  // Verifica senha
  if (password.length < 4 || password.length > 32) {
    return { success: false, message: 'Senha deve ter entre 4 e 32 caracteres.' }
  }

  // Testa se emprega e empregado tem e-mail válidos
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, message: 'E-mail da empresa inválido.' }
  }

  if (employees && employees.some((e) => !emailRegex.test(e.email))) {
    return { success: false, message: 'Um ou mais e-mails de funcionários são inválidos.' }
  }

  // Verifica se e-mail já existe como empresa
  const existing = await Employee.findOne({ where: { email } })
  if (existing) {
    return { success: false, message: 'E-mail já cadastrado como empresa.' }
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    // Cria empresa
    const enterprise  = await Enterprise.create({ name })

    // Cria usuário que comportará a empresa
    await Employee.create({
      email, name, surname: '', password: hashedPassword , role: 'Administrador', id_enterprise: enterprise.id
    })

    // Mapeia emails dos empregados, caso tenha
    if (employees && employees.length > 0) {
      const authorizedEmails = employees.map(({ email, role }) => ({
        email,
        role,
        id_enterprise: enterprise.id
      }))

      await Employee.bulkCreate(authorizedEmails)

    }

    return { success: true, id: enterprise.id}
  } catch (error) {
    console.error(error)
    return { success: false, message: 'Erro ao criar empresa.' }
  }
}
