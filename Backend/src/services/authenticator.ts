import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Employee } from "../repositories/user/employee"

const JWT_SECRET = process.env.JWT_SECRET || 'chave-super-secreta-mesmo';

export const authenticateUser = async (email: string, password: string) => {
  try {
    const employee = await Employee.findOne({ where: { email }})

    if (!employee) 
      return { success: false, message: 'Email ou senha incorretos' }

    const isValid = await bcrypt.compare(password, employee.password || '')

    if (!isValid)
      return { success: false, message: 'Email ou senha incorretos' }

    const payload = {
      email: employee.email,
      role: employee.role,
    }

    // Gerar o token JWT com acesso de 15 minutos
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' })

    // Armazenar o token no banco de dados
    await employee.update({ token })

    return {
      name: employee.name,
      surname: employee.surname,
      idEnterprise: employee.id_enterprise,
      role: employee.role,
      token,
    }
    
  } catch (error) {
    console.log(error)
    return { success: false, message: 'internal-error' }
  }
}

export const refreshToken = async (token: string): Promise <{token?: string; success: boolean; message?: string}> => {
  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string, role: string }
    const employee = await Employee.findOne({ where: { email: decoded.email } })

    if (!employee) {
      return { success: false, message: 'Usuário não encontrado' }
    }

    // Gera um novo token
    const newPayLoad = {
      email: employee.email,
      role: employee.role,
    }

    const newToken = jwt.sign(newPayLoad, JWT_SECRET, { expiresIn: '30m' })

    // Atualiza o token no banco de dados
    await employee.update({ token: newToken })

    return {
      success: true,
      token: newToken
    }
  } catch (error) {
    return {success: false, message: 'Error to refresh token' }
  }
}