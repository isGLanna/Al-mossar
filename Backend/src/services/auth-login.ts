import crypto from 'crypto'
import bcrypt from "bcrypt"
import { Employee } from "../models/employee"

export const authenticateUser = async (email: string, password: string) => {
  try {
    const employee = await Employee.findOne({ where: { email } })

    if (!employee) {
      throw new Error('Usuário não encontrado.')
    }

    const isValid = await bcrypt.compare(password, employee.password)

    if (!isValid) {
      throw new Error('Senha incorreta.')
    }

    const token = crypto.randomBytes(64).toString('base64')
    await employee.update({ token })

    return {
      id: employee.id,
      name: employee.name,
      surname: employee.surname,
      idEnterprise: employee.id_enterprise,
      role: employee.role,
      token,
    }
    
  } catch (error) {
    console.log(error)
    return null
  }
}